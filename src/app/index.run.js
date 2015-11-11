/*
 * Copyright (C) 2015 The Gravitee team (http://gravitee.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function runBlock ($rootScope, $window, $http) {
  'ngInject';
  var graviteeAuthenticationKey = 'GraviteeAuthentication';

  function setAuthorization() {
    var graviteeAuthentication = $window.sessionStorage.getItem(graviteeAuthenticationKey);
    if (graviteeAuthentication) {
      $http.defaults.headers.common.Authorization = 'Basic ' + graviteeAuthentication;
      $rootScope.authenticated = true;
    } else {
      delete $http.defaults.headers.common.Authorization;
      $rootScope.authenticated = false;
    }
  }

  setAuthorization();

  $rootScope.$on('authenticationSuccess', function() {
    setAuthorization();
  });

  $rootScope.$on('graviteeLogout', function() {
    $window.sessionStorage.removeItem(graviteeAuthenticationKey);
    $window.location.href = '/';
  });

}

export default runBlock;