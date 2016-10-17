var QB = require('../../models/qb.model');

describe('Quarterback Model', function() {
  it('should have name, team, and position', function() {
    expect(QB.schema.obj.name).toBeDefined();
    expect(QB.schema.obj.team).toBeDefined();
    expect(QB.schema.obj.position).toBeDefined();
  });
  
  it('should include injury, flex, and price', function() {
    expect(QB.schema.obj.injured).toBeDefined();
    expect(QB.schema.obj.flex).toBeDefined();
    expect(QB.schema.obj.price).toBeDefined();
  });
  
  it('should have quarterback stats', function() {
    expect(QB.schema.obj.stats.rushing).toBeDefined();
    expect(QB.schema.obj.stats.passing).toBeDefined();
    expect(QB.schema.obj.stats.fumbles).toBeDefined();
    expect(QB.schema.obj.stats.sacks).toBeDefined();
  });
});