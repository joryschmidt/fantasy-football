var RB = require('../../models/rb.model');

describe('Runningback model', function() {
  it('should have name, team, and position', function() {
    expect(RB.schema.obj.name).toBeDefined();
    expect(RB.schema.obj.team).toBeDefined();
    expect(RB.schema.obj.position).toBeDefined();
  });
  
  it('should have flex, injury, price', function() {
    expect(RB.schema.obj.flex).toBeDefined();
    expect(RB.schema.obj.injured).toBeDefined();
    expect(RB.schema.obj.price).toBeDefined();
  });
  
  it('should have runningback stats', function() {
    expect(RB.schema.obj.stats.rushing).toBeDefined();
    expect(RB.schema.obj.stats.receiving).toBeDefined();
    expect(RB.schema.obj.stats.fumbles).toBeDefined();
  });
});