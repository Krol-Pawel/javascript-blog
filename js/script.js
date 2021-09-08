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
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

function generateTitleLinks(customSelector = ''){
  // const clickedElement = this;
  // console.log('Link was clicked!');
  // console.log(event);

  /*delete links from the column*/

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  console.log(titleList)

  /*for every article*/
  /*get the ID of article*/
  // const articleId = console.log(article).getAttribute('id');
  // console.log(articleId)
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
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
    titleList.innerHTML = titleList.innerHTML + linkHTML;
    // let html = html + linkHTML;

    // titleList.insertAdjacentHTML('afterend', '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>')
    // titleList.insertAdjacentHTML('beforeend', linkHTML);
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

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles)
  /* START LOOP: for every article: */
  for (let article of articles){
    let html = article.querySelector(optArticleTagsSelector);
    html.innerHTML=''
    console.log(html);
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);
    for (let tag of articleTagsArray){
      console.log(tag);
      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      console.log(linkHTML);
      html.innerHTML = html.innerHTML + linkHTML;
      console.log()
    }

  }
    /* [done] find tags wrapper */

    /* [done] make html variable with empty string */

    /* [done] get tags from data-tags attribute */

    /* [done]split tags into array */

    /* START LOOP: for each tag */

      /* [done]generate HTML of the link */

      /* [done]add generated code to html variable */

    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */

  /* END LOOP: for every article: */

}

generateTags();

function tagClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked 2time!');
  console.log(event);
  const href = clickedElement.getAttribute('href');
  console.log(href)
  const tag = href.replace('#tag-', '');
  console.log (tag);
  const activeLinkToTags = document.querySelectorAll('a.active[href^="#tag-"]');
  for (let activeLinkToTag of activeLinkToTags){
    activeLinkToTag.classList.remove('active')
    console.log(activeLinkToTag)
  }
  let allTagsLinks = document.querySelectorAll('a[href="' + href + '"]');
  for (let allTagLinks of allTagsLinks){
    allTagLinks.classList.add('active');
  }
  generateTitleLinks('[data-tags~="' + tag + '"]');
  /* [done]prevent default action for this event */

  /*[done] make new constant named "clickedElement" and give it the value of "this" */

  /*[done] make a new constant "href" and read the attribute "href" of the clicked element */

  /*[done] make a new constant "tag" and extract tag from the "href" constant */

  /*[done] find all tag links with class active */

  /* START LOOP: for each active tag link */

    /* [done]remove class active */

  /* END LOOP: for each active tag link */

  /* [done]find all tag links with "href" attribute equal to the "href" constant */

  /* START LOOP: for each found tag link */

    /* [done]add class active */

  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
}

function addClickListenersToTags(){
  const allTags = document.querySelectorAll('[href^="#tag-"]');
  for (let allTag of allTags){
    allTag.addEventListener('click', tagClickHandler);
  }
}

addClickListenersToTags();

function generateAuthors(){
  const authors = document.querySelectorAll(optArticleAuthorSelector);
  console.log(authors);
    for (let author of authors){
      author.innerHTML = ''
      const articleAuthors = author.getAttribute('data-author');
      console.log(articleAuthors);
      const linkHTML = '<li><a href="#' + articleAuthors + '"><span>' + articleAuthors + '</span></a></li>';
      console.log(linkHTML);
      author.innerHTML = author.innerHTML + linkHTML;
    }
}

generateAuthors()

function authorClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked 3time!');
  console.log(event);
  const hrefs = clickedElement.getAttribute('data-author');
  console.log(hrefs)
  for (let href of hrefs){
  //   href.classList.remove('active')
  //   console.log(href)
  
  let allAuthors = document.querySelectorAll('a[href="' + href + '"]');
  
  for (let allAuthor of allAuthors){
    allAuthor.classList.add('active');
  }
}
  generateTitleLinks('[data-author~="' + href + '"]');
}

function addClickListenersToAuthors(){
  const allActors = document.querySelectorAll('.post-author');
  for (let allActor of allActors){
    allActor.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();