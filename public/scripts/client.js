/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const $tweetsContainer = $('#tweets-container');

  // adds all tweet elements to tweets container
  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetsContainer.prepend($tweet);
    }
  };

  // New tweet HTML layout
  const createTweetElement = function(tweetData) {
    let $tweet = `
    <section id="tweets-container">
  <article class="tweetArea">
    <header class="userHeader">
      <h4 class="userProfile">
    <img src=${escape(tweetData.user.avatars)}>
     <text style="margin-left: 10px;">${escape(tweetData.user.name)}</text>
  </h4>
    <h4>${escape(tweetData.user.handle)}</h4>
  </header>
    <text class="tweetText">${escape(tweetData.content.text)}</text>
<footer class="tweetFooter">
<i class="fa-sharp fa-solid fa-flag"></i>
<i class="fa-sharp fa-solid fa-repeat"></i>
<i class="fa-sharp fa-solid fa-heart"></i>
</footer>
<p class="timeAgo">${escape(timeago.format(tweetData.created_at))}</p>
</article>
</section>
`;

    return $tweet;
  };

  // POST new tweets to the server
  const $tweetForm = $('#newTweets');

  $tweetForm.submit(function(event) {
    event.preventDefault();

    const maxCharCount = 140;
    const tweetLength = $(this).find('#tweet-text').val().length;

    if (tweetLength > maxCharCount) {
      $('.errorCharLimit').slideDown(3000, function() {
        $('.errorCharLimit').slideUp(2000);
      });
    } else if (!tweetLength) {
      $('.errorNoChar').slideDown(3000, function() {
        $('.errorNoChar').slideUp(2000);
      });
    } else {
      $.ajax({
        method: "POST",
        url: "/tweets/",
        data: $tweetForm.serialize()
      })
        .then(function() {
          $("#tweet-text").val("");
          $('#tweets-container').empty();
          loadTweets();
        });
    }
  });

  // load tweet function with GET
  const loadTweets = function() {
    $.ajax({
      method: "GET",
      url: "/tweets/"
    })
      .then(renderTweets);
  };

  loadTweets();

  // escape function
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

});

