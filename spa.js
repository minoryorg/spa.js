var content_id = '.content';

$(function ($) {
    'use strict';
    if (window.history && window.history.pushState) {
        // click link with pushState
        $(document).on('click', 'a:not([href^="#"], [target="_blank"], [class*="ignore"])', function(e) {
            e.preventDefault();
            var url = $(this).attr('href');
            var title = $(this).attr('title');
            history.pushState({url: url, title: title}, title, url);
            getAction(url);
        });
        
        // form submit with pushState
        $(document).on('submit', 'form:not([action^="#"], [class*="ignore"])', function(e) {
            e.preventDefault();
            var url = $(this).attr('action');
            var title = $(this).attr('title');
            history.pushState({url: url, title: title}, title, url);
            postAction(url);
        });
        
        // send get 
        function getAction(url) {
            $.get(url, { push_state: 'true' }, function(data) {
                loadContent(data);
            })
            .fail(function() {
                loadError();
            });
        }
        
        // send post
        function postAction(url) {
            $.post(url, $("form").serialize(), function(data) {
                loadContent(data);
            })
            .fail(function() {
                loadError();
            });
        }
        
        // content
        function loadContent(data) {
	        var title = $(data).find('title').html();
	        var content = $(data).find(content_id).html();
	        $('title').html(title);
	        $(content_id).html(content);
        }
        
        // error
        function loadError() {
            location.href='/error' // or $(content_id).html('<h1>Error!</h1>');
        }
        
        // history back with popState
        $(window).on('popstate', function(e) {
            getAction(location.pathname);
        });
    }
});
