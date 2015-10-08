'use strict';

//Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('posts');
ApplicationConfiguration.registerModule('users.admin', ['core.admin']);
ApplicationConfiguration.registerModule('users.admin.routes', ['core.admin.routes']);