/*
 * Copyright (c) 2017 SAP and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 * Contributors:
 * SAP - initial API and implementation
 */

var dao = require('zeus-applications-html5/data/dao/Explore/HTML5Applications.js')

exports.getTile = function(relativePath) {
	return {
		'name': 'HTML5 Application',
		'group': 'Explore',
		'icon': 'th-large',
		'location': relativePath + 'services/v3/web/zeus-applications-html5/ui/Explore/index.html',
		'count': dao.customDataCount(),
		'order': '100'
	};
};
