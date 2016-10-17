var K = require('../../models/k.model');

describe('Kicker Model', function() {
  it('should have name, team, and position', function() {
    expect(K.schema.obj.name).toBeDefined();
    expect(K.schema.obj.team).toBeDefined();
    expect(K.schema.obj.position).toBeDefined();
  });
  
  it('should have fields for flex, injured, and price', function() {
    expect(K.schema.obj.flex).toBeDefined();
    expect(K.schema.obj.injured).toBeDefined();
    expect(K.schema.obj.price).toBeDefined();
  });
  
  it('should have kicker stats', function() {
    expect(K.schema.obj.stats.pat).toBeDefined();
    expect(K.schema.obj.stats.fg).toBeDefined();
  });
});