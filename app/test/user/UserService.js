/**
 * Created by rerobins on 3/12/15.
 */
describe('user::UserService', function() {

    var $httpBackend, userHandler, user;

    var selfGetRegExp = new RegExp('/self/$');

    beforeEach(module('user'));

    beforeEach(inject(function(_$httpBackend_, Restangular) {
        $httpBackend = _$httpBackend_;

        Restangular.setRequestSuffix('/');

        user = {
            username: "username",
            email: "email@example.com"
        };

        userHandler = $httpBackend.whenGET(selfGetRegExp).respond(user);

    }));

    it('should not have a user defined by default', inject(function(UserService) {
        expect(UserService.isUserDefined()).not.toBeTruthy();
    }));

    it('should not broadcast a clear when there is no user defined.', inject(function(UserService, $rootScope) {
        spyOn($rootScope, '$broadcast');

        // Clearing an empty user service should not broadcast any events
        UserService.clearUser();

        expect($rootScope.$broadcast).not.toHaveBeenCalled();
    }));

    it('should request the user and return a promise', inject(function(UserService) {
        $httpBackend.expectGET(selfGetRegExp);

        var result = UserService.getUser();

        expect(result.then).toBeDefined();

        result.then(function(_user) {
            expect(_user).toBeDefined();
            expect(_user.username).toBe(user.username);
        });

        $httpBackend.flush();

        expect(UserService.isUserDefined()).toBeTruthy();

    }));

    it('should request the user only once', inject(function(UserService) {

        $httpBackend.expectGET(selfGetRegExp);

        var result = UserService.getUser();

        expect(result.then).toBeDefined();

        result.then(function(_user) {
            expect(_user).toBeDefined();
            expect(_user.username).toBe(user.username);
        });

        $httpBackend.flush();

        var nextResult = UserService.getUser();

        expect(nextResult).toBe(result);

        expect(UserService.isUserDefined()).toBeTruthy();

    }));

    it('should not have a user defined after clearing the method', inject(function(UserService) {

        $httpBackend.expectGET(selfGetRegExp);

        UserService.getUser();

        $httpBackend.flush();

        expect(UserService.isUserDefined()).toBeTruthy();
        UserService.clearUser();

        expect(UserService.isUserDefined()).not.toBeTruthy();

    }));

    it('should broadcast the user defined and user cleared method', inject(function(UserService, USER_EVENTS, $rootScope) {

        spyOn($rootScope, '$broadcast');

        $httpBackend.expectGET(selfGetRegExp);

        var user = null;
        UserService.getUser().then(function(_user) {
            user = _user;
        });

        $httpBackend.flush();

        expect(user).not.toBeNull();
        expect($rootScope.$broadcast).toHaveBeenCalledWith(USER_EVENTS.USER_DEFINED, user);

        UserService.clearUser();

        expect($rootScope.$broadcast).toHaveBeenCalledWith(USER_EVENTS.USER_CLEARED);

    }));

    it('should handle self fetching errors without blocking future calls', inject(function(UserService, $rootScope) {
        userHandler.respond(500, {
            error: 'SOme Error Message'
        });

        $httpBackend.expectGET(selfGetRegExp);

        var result = UserService.getUser();

        var error = null;
        var localUser = null;
        result.then(function(_user) {
            // This should not be called, as the above should generate an error.
            localUser = _user;
        }).catch(function(_error) {
            error = _error;
        });

        $httpBackend.flush();

        expect(localUser).toBeNull();
        expect(error).not.toBeNull();

        expect(UserService.isUserDefined()).not.toBeTruthy();

        // Verify that can execute the get again without being blocked.
        userHandler.respond(200, user);

        $httpBackend.expectGET(selfGetRegExp);

        result = UserService.getUser();

        localUser = null;
        error = null;
        result.then(function(_user) {
            localUser = _user;
        }).catch(function(_error) {
            error = _error;
        });

        $httpBackend.flush();

        expect(localUser).not.toBeNull();
        expect(error).toBeNull();
        expect(UserService.isUserDefined()).toBeTruthy();

        // Just verify that the http is not getting hit again.
        localUser = null;
        UserService.getUser().then(function(_user) {
            localUser = _user;
        });

        // Keep forgetting to put this in order to resolve the promises.
        $rootScope.$apply();
        expect(localUser).not.toBeNull();

    }));

});