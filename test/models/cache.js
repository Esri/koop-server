var should = require('should');

before(function (done) {
  key = 'test/repo/file';
  repoData = require('../fixtures/repo.geojson');
  PostGIS = require('../../lib/PostGIS.js');
  Cache = require('../helpers/Cache.js');
  done();
});

describe('PostGIS Cache Model Tests', function(){

    describe('when caching a github file', function(){

      afterEach(function(done){
        Cache.remove('repo', key, {layer: 0}, done);
      });

      it('should error when missing key is sent', function(done){
        Cache.get('repo', key+'-BS', {}, function( err, data ){
          should.exist( err );
          done();
        });
      });

      it('should insert and remove the data', function(done){
        Cache.insert( 'repo', key, repoData[0], 0, function( error, success ){
          should.not.exist(error);
          success.should.equal( true );
          Cache.remove('repo', key, {layer: 0}, function( err, d ){
            should.not.exist(err);
            Cache.get('repo', key, {}, function(err, result){
              should.exist( err );
              done();
            });
          });
        });
      });

      it('should insert and get the sha', function(done){
        Cache.insert( 'repo', key, repoData[0], 0, function( error, success ){
          should.not.exist(error);
          success.should.equal( true );
          Cache.get('repo', key, {}, function( err, d ){
            should.not.exist(err);
            should.exist(d[0].sha);
            d[0].sha.should.equal('e3729d510e786be80126225579214a78cf06e7a1');
            done();
          });
        });
      });
    });

});

