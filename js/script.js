const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-article-tag').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-article-author').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),
}
console.log(document.querySelector('#template-article-tag').innerHTML)
console.log(document.querySelector('#template-author-cloud-link').innerHTML)
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

  /*delete links from the column*/

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  console.log(titleList)

  /*for every article*/
  /*get the ID of article*/
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
    titleList.innerHTML = titleList.innerHTML + linkHTML;
  }

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
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return optCloudClassPrefix + classNumber
}

function calculateTagsParams(tags){
  const params = {
    max: 0,
    min: 999999,
  };
  for(let tag in tags){
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
      html = html + ' ' + linkHTML;
      console.log(linkHTML);
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
      /* [NEW] add generated code to allTags array */
      allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      titleList.innerHTML = html;
      console.log(titleList.innerHTML)
    }

    }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  /* [NEW] add html from allTags to tagList */
  console.log(allTags)

  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams)
  const allTagsData = {tags: []};
  console.log(allTagsData)
  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    /* [NEW] generat code of a link and add it to allTagsHTML */
    const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li> ';
    console.log('taglinkHTML:', tagLinkHTML);
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
    console.log(calculateTagClass(allTags[tag], tagsParams));
  /* [NEW] END LOOP: for each tag in allTags */
  }
  /* [NEW] add html from allTagsHTML to tagList */
  tagList.innerHTML = templates.tagCloudLink(allTagsData)
  
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
  const params = {
    max: 0,
    min: 999999,
  };
  for(let author in authors){
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
    const wrapperAuthor = article.querySelector(optArticleAuthorSelector);
    const articleAuthors = article.getAttribute('data-author');
    const linkHTMLData = {id:articleAuthors, aut:articleAuthors};
    wrapperAuthor.innerHTML= templates.authorLink(linkHTMLData);
    if(!allAuthors.hasOwnProperty(articleAuthors)){
    allAuthors[articleAuthors] = 1;
    } else {
    allAuthors[articleAuthors]++;
    }
  }
  
  const authorList = document.querySelector('.authors');
  console.log(allAuthors)
  const allAuthorsData = {allAuthors: []}
  console.log(allAuthors)
  for(let author in allAuthors){
    allAuthorsData.allAuthors.push({
      auth: author,
    });
    console.log(author)
  
  console.log(allAuthorsData)
  }
  authorList.innerHTML = templates.authorCloudLink(allAuthorsData)
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
  let allAuthors = document.querySelectorAll('a[href="' + href + '"]');
  
  for (let allAuthor of allAuthors){
    allAuthor.classList.add('active');
  }
  generateTitleLinks('[data-author="' + href + '"]');
}

function addClickListenersToAuthors(){
  const links = document.querySelectorAll('a[href^="#author"]');
  for (let link of links){
    link.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();