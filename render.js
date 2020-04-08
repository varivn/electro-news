const $ = require('jquery');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('ff546bc4185746c9813979da3a683062');
let navItems = $('.nav-group-item');
let articles = null;

getNews('business');

function getNews(category){

    newsapi.v2.topHeadlines({
    category: category,
    language: 'en',
    country: 'us'
    }).then((response) => {
        console.log(response);
        articles = response.articles;
        showNews(response.articles);
    }).catch((err) => {
        console.log(err);    
    });
}


function showNews(allNews){
    $('#news-list').html('');

    $('#news-list').append(`
    <li class="list-group-header">
        <input class="form-control" type="text" value="" placeholder="Search for news" onchange="search(this)">
    </li>
    `);

    allNews.forEach(news => {
        let singleNews = `
        <li class="list-group-item">
            <img class="img-circle media-object pull-left" src="${news.urlToImage}" width="50"
                height="50">
            <div class="media-body">
                <strong><a href="${news.url}" onclick="openArticle(event)">${news.title}</a></strong>
                <div>
                    <span class="">${news.publishedAt}</span>
                    <span class="pull-right">Author: ${news.author}</span>
                </div>
                <p>${news.description}</p>
            </div>
        </li>
        `

        $('#news-list').append(singleNews);
    })
}

function openArticle(event){
    let link = event.target.href;
    // console.log(link);
    window.open(link);
    event.preventDefault(); 
}

navItems.click((event) => {
    let category = event.target.id;
    navItems.removeClass('active');
    $(event.target).addClass('active');
    getNews(category);
})

function search(input){
    let query = $(input).val()
    let sortedArticles = articles.filter((item) => item.title.toLowerCase().includes(query.toLocaleLowerCase()))
    showNews(sortedArticles);
    // console.log(query);
}