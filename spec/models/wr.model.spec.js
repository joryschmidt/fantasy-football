var WR = require('../../models/wr.model');

describe('Wide Receiver Model', function() {
  it('should have name, team, position', function() {
    expect(WR.schema.obj.name).toBeDefined();
    expect(WR.schema.obj.team).toBeDefined();
    expect(WR.schema.obj.position).toBeDefined();
  });
  
  it('should have flex, injured, price', function() {
    expect(WR.schema.obj.flex).toBeDefined();
    expect(WR.schema.obj.injured).toBeDefined();
    expect(WR.schema.obj.price).toBeDefined();
  });
  
  it('should have wide receiver stats', function() {
    expect(WR.schema.obj.stats.receiving).toBeDefined();
    expect(WR.schema.obj.stats.rushing).toBeDefined();
    expect(WR.schema.obj.stats.fumbles).toBeDefined();
  });
});