
(function (global) {
  var dc = {};
  var homeHtmlUrl = "snippets/home-snippet.html";
  var allCategoriesUrl = "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json";

  var insertHtml = function (selector, html) {
    document.querySelector(selector).innerHTML = html;
  };

  var showLoading = function (selector) {
    var html = "<div class='text-center'><img src='images/ajax-loader.gif'></div>";
    insertHtml(selector, html);
  };

  document.addEventListener("DOMContentLoaded", function () {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(allCategoriesUrl, buildAndShowHomeHTML, true);
  });

  function buildAndShowHomeHTML(categories) {
    $ajaxUtils.sendGetRequest(homeHtmlUrl, function (homeHtml) {
      var chosenCategoryShortName = chooseRandomCategory(categories).short_name;
      var homeHtmlToInsertIntoMainPage = homeHtml.replace("{{randomCategoryShortName}}", "'" + chosenCategoryShortName + "'");
      insertHtml("#main-content", homeHtmlToInsertIntoMainPage);
    }, false);
  }

  function chooseRandomCategory(categories) {
    var randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex];
  }

  global.$dc = dc;
})(window);
