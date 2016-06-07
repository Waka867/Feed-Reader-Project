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
        // Declaration of var for dom elements
        var body = $('body');
        var bodystatus = $('body').hasClass('menu-hidden');

        /* DONE: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

         it('is hidden by default', function() {
            expect(bodystatus).toBe(true);
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
            expect(body.attr('class')).not.toBe('menu-hidden');
            // Triggers click to re-add menu-hidden class from body
            $('.menu-icon-link').trigger('click');
            // Makes sure menu-hidden is now part of body class list
            expect(bodystatus).toBe(true);
        });
    });

    /* DONE: Write a new test suite named "Initial Entries" */

    var feedZero;

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

        it('have a single .entry, minimum', function() {
            // Checks length of elements in entry class
            len = $('.entry').length;
            // Checks to make sure there is at least one item in entry class
            expect(len).toBeGreaterThan(1);
            // Declarations and console log to verify contents of feed 1 (for later comparison)
            var feed0 = $('.feed');
            var feedZero = feed0[0].outerText;
            console.log('Feed 0 is: ' + feedZero);
        });
    });

    /* DONE: Write a new test suite named "New Feed Selection" */

    // Test suite for loading new entries and for duplicates
    describe('New Feed Selection', function() {
        // Makes sure feeds are loaded before expectations are evaluated
        beforeEach(function(done) {
            loadFeed(1, done);
        });

        /* DONE: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        it('is different content', function(){
            // Declarations and console log to verify that feed one is different than feed zero and that those will be compared
            var feed1 = $('.feed');
            var feedOne = feed1[0].outerText;
            console.log('Feed 1 is: ' + feedOne);
            // Checks to make sure feed html content is unique between first and second feed samples
            expect(feedOne).not.toEqual(feedZero);
        });
    });
}()); // self-invoking function