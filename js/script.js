const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-article-tag').innerHTML)
}
console.log(document.querySelector('#template-article-tag').innerHTML)

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
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector= 'authors.list';

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
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
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

function calculateTagClass (count, params){
  // const params = {
  //   min: 1,
  //   max: 6
  // };
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return optCloudClassPrefix + classNumber
}

function calculateTagsParams(tags){
  // const params = Math.max(0) && Math.min(999999);
  const params = {
    max: 0,
    min: 999999,
  };
  for(let tag in tags){
    // if(tags[tag] > Math.max){
    //   Math.max = tags[tag];
    // }
    // if(tags[tag] , Math.min){
    //   Math.min = tags[tag];
    // }
    if(tags[tag] > params.max){
      params.max = tags[tag];
    } if(tags[tag] < params.min){
      params.min = tags[tag];
    }
    console.log(tag + ' is used ' + tags[tag] + ' times ');

  }
  return params;
}

function generateTags(){
  /* [NEW] create a new variable allTags with an empty array [] */
  /* [NEW] create a new variable allTags with an empty object {} */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles)
  /* START LOOP: for every article: */
  for (let article of articles){
    let titleList = article.querySelector(optArticleTagsSelector);
    let html = ''
    console.log(html);
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);
    for (let tag of articleTagsArray){
      console.log(tag);
      const linkHTMLData = {id:'tag-'+tag, tag:tag};
      const linkHTML = templates.tagLink(linkHTMLData);
      //const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      html = html + ' ' + linkHTML;
      console.log(linkHTML);
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
      /* [NEW] add generated code to allTags array */
      allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    //const tagList = document.querySelector('.tags');

      titleList.innerHTML = html;
      console.log(titleList.innerHTML)
    }

    }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  /* [NEW] add html from allTags to tagList */
  //tagList.innerHTML = allTags.join(' ');
  console.log(allTags)

  /* [NEW] create variable for all links HTML code */
  // function calculateTagsParams(tags){
  //   const params = Math.max(0) && Math.min(999999);
  //   for(let tag in tags){
  //     console.log(tag + ' is used ' + tags[tag] + ' times ');
  //     if(tags[tag] > Math.max){
  //       Math.max = tags[tag];
  //     }
  //     if(tags[tag] , Math.min){
  //       Math.min = tags[tag];
  //     }
  //   }
  //   return params;
  // }
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams)
  let allTagsHTML = '';
  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    /* [NEW] generat code of a link and add it to allTagsHTML */
    //const tagLinkHTML = tag + '<li><a href="#tag-" class="' + calculateTagClass(allTags[tag], tagsParams) + '"><span>' + allTags[tag] + '</span></a></li>';
    const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li> ';
    //const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + ' ' + usunąłem -allTags[tag] +  '</a></li> ';
    console.log('taglinkHTML:', tagLinkHTML);
    allTagsHTML += tagLinkHTML;
    console.log(calculateTagClass(allTags[tag], tagsParams))

    //allTagsHTML += tagLinkHTML;
    // console.log('taglinkHTML:', taglinkHTML);
  /* [NEW] END LOOP: for each tag in allTags */
  }
  // const linkHTML = '<li><a href="#tag-"><span>' + allTagsHTML + '</span></a></li>';

  /* [NEW] add html from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;

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
  console.log(activeLinkToTags)
  for (let activeLinkToTag of activeLinkToTags){
    activeLinkToTag.classList.remove('active')
    console.log(activeLinkToTag)
  }
  let allTagsLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(allTagsLinks)
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

function calculateAuthtorsParams(authors){
  // const params = Math.max(0) && Math.min(999999);
  const params = {
    max: 0,
    min: 999999,
  };
  for(let author in authors){
    // if(tags[tag] > Math.max){
    //   Math.max = tags[tag];
    // }
    // if(tags[tag] , Math.min){
    //   Math.min = tags[tag];
    // }
    if(authors[author] > params.max){
      params.max = authors[author];
    } if(authors[author] < params.min){
      params.min = authors[author];
    }
    console.log(author + ' is used ' + authors[author] + ' times ');

  }
  return params;
}

function generateAuthors(){
  let allAuthors = {};
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles)
  for (let article of articles){
    let html = article.querySelector(optArticleAuthorSelector);
    html.innerHTML=''
    console.log(html)
        //article.getattribute data author
    const articleAuthors = article.getAttribute('data-author');
    const linkHTML = '<a href="#' + articleAuthors + '"><span>' + articleAuthors + '</span></a>';
    //for (let author = author of articleAuthors){}
    if(!allAuthors.hasOwnProperty(articleAuthors)){
    allAuthors[articleAuthors] = 1;
    } else {
    allAuthors[articleAuthors]++;
    }

    html.innerHTML = html.innerHTML + linkHTML;
  }
  
  const authorList = document.querySelector('.authors');
  console.log(allAuthors)
  const authorParams = calculateAuthtorsParams(allAuthors)
  console.log('authorParams:', authorParams)
  let allAuthorsHTML = '';
  for(let author in allAuthors){
    const authorLinkHTML ='<li><a href="#"><span>'+ author + ' ' + allAuthors[author] + '</span></a></li>';
    console.log('authorLinkHTML:', authorLinkHTML)
    allAuthorsHTML += authorLinkHTML
    //authorList.innerHTML = allAuthorsHTML += authorLinkHTML;

  }
  authorList.innerHTML = allAuthorsHTML;
    // console.log(html);
    // const authors = document.querySelectorAll(optArticleAuthorSelector);
    // console.log(authors);
    // for (let author of authors){
    //   author.innerHTML = ''
    //   const articleAuthors = author.getAttribute('data-author');
    //   console.log(articleAuthors);
    //   const linkHTML = '<li><a href="#' + articleAuthors + '"><span>' + articleAuthors + '</span></a></li>';
      
    //   console.log(linkHTML);
    //   author.innerHTML = author.innerHTML + linkHTML;
    // }
  
}

generateAuthors()

function authorClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked 3time!');
  console.log(event);
  const href = clickedElement.innerText;
  console.log(href)
  const activeLinkToActors = document.querySelectorAll('a.active[href^="#"]');
  console.log(activeLinkToActors)
  for (let activeLinkToActor of activeLinkToActors){
    activeLinkToActor.classList.remove('active')
    console.log(activeLinkToActor)
  }
  // for (let href of hrefs){
  //   href.classList.remove('active')
  //   console.log(href)
  // }
  let allAuthors = document.querySelectorAll('a[href="' + href + '"]');
  
  for (let allAuthor of allAuthors){
    allAuthor.classList.add('active');
  }
  generateTitleLinks('[data-author="' + href + '"]');
}

function addClickListenersToAuthors(){
  const allAutors = document.querySelectorAll('.post-author');
  for (let allAutor of allAutors){
    allAutor.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();