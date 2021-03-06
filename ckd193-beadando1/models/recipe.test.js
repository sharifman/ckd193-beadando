var Browser = require('zombie');

Browser.localhost(process.env.IP, process.env.PORT);

describe('User visits index page', function() {
    var browser = new Browser();
    
    before(function() {
        return browser.visit('/');
    });
    
    it('should be successful', function() {
        browser.assert.success();
    });
    
    it('should see welcome page', function() {
        browser.assert.text('div.page-header > h1', 'Koktél receptek');
    });
});

describe('User visits new recipe page', function (argument) {

    var browser = new Browser();
    
    before(function() {
        return browser.visit('/recipes/new');
    });
    
    it('should go to the authentication page', function () {
        browser.assert.redirected();
        browser.assert.success();
        browser.assert.url({ pathname: '/login' });
    });
    
     it('should be able to login with correct credentials', function (done) {
        browser
            .fill('felhnev', 'Ellasandra')
            .fill('password', 'titkos')
            .pressButton('button[type=submit]')
            .then(function () {
                browser.assert.redirected();
                browser.assert.success();
                browser.assert.url({ pathname: '/recipes/list' });
                done();
            });
    });

});