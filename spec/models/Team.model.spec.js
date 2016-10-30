var Team = require('../../models/Team.model');

describe('Team Model', function() {
  it('should have team name, players, defense', function() {
    expect(Team.schema.obj.name).toBeDefined();
    expect(Team.schema.obj.players).toBeDefined();
    expect(Team.schema.obj.defense).toBeDefined();
  });
});