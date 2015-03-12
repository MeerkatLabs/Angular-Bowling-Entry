/**
 * Created by rerobins on 3/12/15.
 */
describe('user::UserService', function() {

    var $httpBackend;

    var user = {
        username: "username",
        email: "email@example.com",
    };

    var selfGetRegExp = new RegExp('/self/$');

    beforeEach(module('user'));

    beforeEach(inject(function(_$httpBackend_, Restangular) {
        $httpBackend = _$httpBackend_;

        Restangular.setRequestSuffix('/');

        $httpBackend.whenGET(selfGetRegExp).respond(user);

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

        var $scope = $rootScope.$new();

        spyOn($rootScope, '$broadcast');

        $httpBackend.expectGET(selfGetRegExp);

        var user;
        UserService.getUser().then(function(_user) {
            user = _user;
        });

        $httpBackend.flush();

        expect(user).toBeDefined();
        expect(user).not.toBeNull();
        expect($rootScope.$broadcast).toHaveBeenCalledWith(USER_EVENTS.USER_DEFINED, user);

        UserService.clearUser();

        expect($rootScope.$broadcast).toHaveBeenCalledWith(USER_EVENTS.USER_CLEARED);

    }));

});