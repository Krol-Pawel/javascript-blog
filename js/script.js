'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);

  /* remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks){
    activeLink.classList.remove('active')
  }

  /* add class 'active' to the clicked link */

  console.log('clickedElement: ', clickedElement);
  clickedElement.classList.add('active');

  /* remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.post');

  for (let activeArticle of activeArticles){
    activeArticle.classList.remove('active')
  }
  /* get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* add class 'active' to the correct article */

  console.log('clickedElement: ', clickedElement);
  targetArticle.classList.add('active');

}

// const links = document.querySelectorAll('.titles a');
// console.log(links)
// for(let link of links){
//   link.addEventListener('click', titleClickHandler);
// }


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){
  // const clickedElement = this;
  // console.log('Link was clicked!');
  // console.log(event);

  /*delete links from the column*/

  const titleList = document.querySelector(optTitleListSelector).innerHTML = '';
  console.log(titleList)

  /*for every article*/
  /*get the ID of article*/
  // const articleId = console.log(article).getAttribute('id');
  // console.log(articleId)
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles){
    const articleId = article.getAttribute('id');
    console.log(article);
    console.log(articleId);
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log(articleTitle);
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);
    /*nie działa*/
    // document.querySelector(optTitleListSelector).innerHTML = titleList.innerHTML + linkHTML;
    // titleList.innerHTML = titleList.innerHTML + linkHTML;
    // let html = html + linkHTML;

    // titleList.insertAdjacentHTML('afterend', '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>')
    document.querySelector(optTitleListSelector).insertAdjacentHTML('beforeend', linkHTML);
  }
  // titleList.innerHTML = html
  // titleList.innerHTML = titleList.innerHTML + linkHTML

  /*find tltle of element and assign title to the constans*/

  /*do the HTML code of the link*/

  /*inner link into titlelist*/
  const links = document.querySelectorAll('.titles a');
  console.log(links)
  for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
}

generateTitleLinks();