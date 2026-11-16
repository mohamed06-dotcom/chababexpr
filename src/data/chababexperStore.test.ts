import test from 'node:test';
import assert from 'node:assert/strict';
import {
  applyToMission,
  calculatePaymentBreakdown,
  createInitialDemoState,
  createOrgMission,
  decideApplicationStatus,
  getPublicationFeeForPlan,
  markMissionCompletedAndRate,
  payMissionEscrow,
  startAcceptedMission,
  youthConfirmCompletion,
} from './chababexperStore';

test('10% commission breakdown calculates exact amounts', () => {
  const res = calculatePaymentBreakdown(1200);
  assert.equal(res.gross, 1200);
  assert.equal(res.commission, 120);
  assert.equal(res.net, 1080);
});

test('publication fee honors Free vs Pro/Business plans and unpaid offers', () => {
  assert.equal(getPublicationFeeForPlan('Free', true), 150);
  assert.equal(getPublicationFeeForPlan('Free', false), 0);
  assert.equal(getPublicationFeeForPlan('Pro', true), 0);
  assert.equal(getPublicationFeeForPlan('Business', true), 0);
});

test('full 2-minute presentation flow: Youssef applies -> Atlas accepts -> En cours -> Pay -> Terminée & rated -> Portfolio updated', () => {
  let state = createInitialDemoState();
  assert.ok(state.missions.length >= 12);

  // 1. Youssef applies to Atlas Digital mission
  const applyRes = applyToMission(
    state,
    'm-atlas-1',
    'Je maîtrise Canva et je souhaite réaliser ma première mission design.'
  );
  assert.equal(applyRes.error, null);
  state = applyRes.state;
  const appId = state.applications[0].id;
  assert.equal(state.applications[0].status, 'En attente');

  // 2. Atlas Digital accepts
  state = decideApplicationStatus(state, appId, 'Acceptée');
  assert.equal(state.applications[0].status, 'Acceptée');

  // 3. Mission starts -> En cours
  state = startAcceptedMission(state, appId);
  assert.equal(state.applications[0].status, 'En cours');

  // 4. Simulated checkout payment (1200 MAD, 10% fee = 120 MAD, net = 1080 MAD)
  const beforeEarned = state.youth.totalEarnedMad;
  state = payMissionEscrow(state, appId);
  assert.equal(state.applications[0].paidThroughPlatform, true);
  assert.equal(state.youth.totalEarnedMad, beforeEarned + 1080);

  // 5. Atlas marks completed & rates 5 stars -> portfolio & badges updated
  state = markMissionCompletedAndRate(state, appId, 5, 'Visuels créatifs et livrés à temps.');
  assert.equal(state.applications[0].status, 'Terminée');
  assert.equal(state.youth.reviews[0].rating, 5);
  assert.ok(state.youth.skills.includes('Identité visuelle'));
  assert.ok(state.youth.badges.includes('Top évaluation 5★'));

  // 6. Youth confirms completion
  state = youthConfirmCompletion(state, appId);
  assert.equal(state.applications[0].youthConfirmed, true);
});

test('organization mission creation validates fields and adds new mission at top', () => {
  const state = createInitialDemoState();
  const invalid = createOrgMission(state, {
    title: 'ab',
    description: 'short',
    category: 'Design',
    type: 'Mission courte',
    city: 'Rabat',
    durationDays: 5,
    paid: true,
    budgetMad: 500,
    skillsText: 'Canva',
  });
  assert.ok(invalid.error !== null);

  const valid = createOrgMission(state, {
    title: 'Création logo startup',
    description: 'Concevoir un logo minimaliste et déclinaisons couleurs.',
    category: 'Design',
    type: 'Mission courte',
    city: 'Casablanca',
    durationDays: 6,
    paid: true,
    budgetMad: 900,
    skillsText: 'Figma, Illustrator',
  });
  assert.equal(valid.error, null);
  assert.equal(valid.state.missions[0].orgName, 'Atlas Digital');
  assert.equal(valid.state.missions[0].publicationFeeMad, 150);
});
