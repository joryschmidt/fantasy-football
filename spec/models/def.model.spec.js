var DEF = require('../../models/def.model');

describe('Defense Model', function() {
  it('should have team name and position', function() {
    expect(DEF.schema.obj.name).toBeDefined();
    expect(DEF.schema.obj.position).toBeDefined();
  });
  
  it('should have price', function() {
    expect(DEF.schema.obj.price).toBeDefined();
  });
  
  it('should have defense stats', function() {
    expect(DEF.schema.obj.stats.pa).toBeDefined();
    expect(DEF.schema.obj.stats.fr).toBeDefined();
    expect(DEF.schema.obj.stats.td).toBeDefined();
    expect(DEF.schema.obj.stats.int).toBeDefined();
    expect(DEF.schema.obj.stats.saf).toBeDefined();
  });
});