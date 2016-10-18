var Player = require('../../models/Player.model');

describe('Player Model', function() {
  it('should have player name, team, position, and weekly stats', function() {
    expect(Player.schema.obj.name).toBeDefined();
    expect(Player.schema.obj.team).toBeDefined();
    expect(Player.schema.obj.position).toBeDefined();
    expect(Player.schema.obj.weekly_stats).toBeDefined();
  });
});