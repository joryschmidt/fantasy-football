var TE = require('../../models/te.model');

describe('Tight End Model', function() {
  it('should have name, team, position', function() {
    expect(TE.schema.obj.name).toBeDefined();
    expect(TE.schema.obj.team).toBeDefined();
    expect(TE.schema.obj.position).toBeDefined();
  });
  
  it('should have flex, injured, price', function() {
    expect(TE.schema.obj.flex).toBeDefined();
    expect(TE.schema.obj.injured).toBeDefined();
    expect(TE.schema.obj.price).toBeDefined();
  });
  
  it('should have wide receiver stats', function() {
    expect(TE.schema.obj.stats.receiving).toBeDefined();
    expect(TE.schema.obj.stats.rushing).toBeDefined();
    expect(TE.schema.obj.stats.fumbles).toBeDefined();
  });
});