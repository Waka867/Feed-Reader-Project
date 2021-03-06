/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */

    // Global feed entry item declaration
    var feedItem;

    // RSS feed functionality test suite
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* DONE: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

         it('have a defined URL', function() {
            for(i = 0, leng = allFeeds.length; i < leng; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toEqual('');
            }
         });

        /* DONE: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('have a defined name', function() {
            for(i = 0, leng = allFeeds.length; i < leng; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toEqual('');
            }
        });
    });


    /* DONE: Write a new test suite named "The menu" */

    // Slide-in menu test suite
    describe('The menu', function() {

        /* DONE: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* DONE: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

        it('changes visibility on icon click', function() {
            // Triggers click to remove menu-hidden class from body
            $('.menu-icon-link').trigger('click');
            // Checks to make sure body class is not menu-hidden (can be another class)
            expect($('body').hasClass('menu-hidden')).toBe(false);
            // Triggers click to re-add menu-hidden class from body
            $('.menu-icon-link').trigger('click');
            // Makes sure menu-hidden is now part of body class list
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* DONE: Write a new test suite named "Initial Entries" */

    // Test suite for initial loading function and for empty entries
    describe('Initial Entries', function() {

        /* DONE: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        // Load first feed
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('have at least one .entry element within .feed', function() {
            var feed0Test = $('.feed .entry-link');
            console.log(feed0Test);
            var feedChildTest = feed0Test[0].children;
            console.log(feedChildTest[0].className);
            // Checks to make sure feed container has item somewhere within it with entry class
            expect(feedChildTest[0].className).toBe('entry');
        });
    });

    /* DONE: Write a new test suite named "New Feed Selection" */

    // Test suite for loading new entries and for duplicates
    describe('New Feed Selection', function() {
        // Makes sure feeds are loaded before expectations are evaluated
        beforeEach(function(done) {
            // When changed so this loads feed 0 instead of 1, test fails because test items are equal when they should not be
            loadFeed(1, done);
        });

        /* DONE: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        it('is different content', function(done){
            var feed1 = $('.feed .entry-link .entry');
            console.log(feed1);
            feedOne = feed1[0].innerText;
            console.log(feedOne);
            loadFeed(0, function() {
                var feed0 = $('.feed .entry-link .entry');
                console.log(feed0);
                feedZero = feed0[0].innerText;
                console.log(feedZero);
                // Checks to make sure feed html content is unique between first and second feed samples
                expect(feedZero).not.toEqual(feedOne);
                done();
            });
        });
    });
}()); // self-invoking function