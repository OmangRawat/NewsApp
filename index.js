function rendernews()
{
    // render all news
    let newsitems = document.getElementById("newsitems");
    newsitems.innerHTML = ""
    newsitems.appendChild(rendernewsitems("in"));
    newsitems.appendChild(rendernewsitems("us"));
    newsitems.appendChild(rendernewsitems("ae"));
}

function rendernewsitems(country)
{
    // render news based on countries
    let link = 'https://newsapi.org/v2/top-headlines?country=' + country + '&apiKey=fdf685fc10664ea7b29f9cd3d19f4c75'
    let countrynewsitems = createele('div', 'countrynewsitems')
    countrynewsitems.id = country + "news"
    axios.get(link).then(resp => {
        let newsitem = "";
        resp.data.articles.forEach((element, index) => {
            if (index % 3 != 2)
            {
                newsitem = createele('div', 'newsitem');
            }
            switch(index % 3)
            {
                case 0:
                    newsitem = createFullNewsItem(element)
                    countrynewsitems.appendChild(newsitem);
                    break;
                case 1:
                    newsitem.appendChild(createHalfNewsItem(element));
                    break;
                case 2:
                    newsitem.appendChild(createHalfNewsItem(element));
                    countrynewsitems.appendChild(newsitem);
                    newsitem = ""
                    break;
                default:
                    alert("Error in News loop");
            }
        });
        if (newsitem != "")
        {
            countrynewsitems.appendChild(newsitem)
        }
    });
    console.log(countrynewsitems)
    return countrynewsitems;
}

function createFullNewsItem(element)
{
    // news item with images
    newstags = ['Business', 'Politics', "Trend"];
    let newsitem = createele('div', 'newsitem');

    newsitem.appendChild(createHeaderItem(element.author)); // header
    newsitem.appendChild(createNewsTags(newstags)); // news item tags
    newsitem.appendChild(createHeading(element.title)); //news item title
    newsitem.appendChild(createNewsInfo(likes='0', rating='5.4', views='125k', time=' 4 months ago')); // add newsinfo
    newsitem.appendChild(createNewsImg(element.urlToImage)); // add image

    return newsitem;
}

function createHalfNewsItem(element)
{
    // news item with context
    let inevennewsitem = createele('div', 'inevennewsitem');
    newstags = ['Business', 'Politics', "Trend"];

    inevennewsitem.appendChild(createHeaderItem(element.author)); // header
    inevennewsitem.appendChild(createNewsTags(newstags)); // news item tags
    inevennewsitem.appendChild(createHeading(element.title)); // news item title
    inevennewsitem.appendChild(createNewsContent()); // news content
    inevennewsitem.appendChild(createNewsInfo(likes='0', rating='5.4', views='125k', time='4 months ago')); // add newsinfo

    return inevennewsitem;
}

function createHeaderItem(uname)
{
    // news item header (user, tags, header btns)
    let headeritem = document.createElement('div');
    headeritem.className = "headernewsitem"
    //user
    let user = createele('span', 'user');
    let userimg = createele('span', 'userimg');
    userimg.innerHTML = "<img src='' alt=')'>"
    user.appendChild(userimg);
    let username = createele('span', 'username');
    username.innerText = uname;
    user.appendChild(username);
    headeritem.appendChild(user);
    // usertag
    let usertag = createele('span', 'usertag')
    usertag.innerText = "TEAM";
    headeritem.appendChild(usertag);
    // btns
    let btns = createele('span', 'btns');
    let sharebtn = createele('button', 'sharebtn');
    sharebtn.innerText = "Share";
    let collectbtn = createele('button', 'collectbtn');
    collectbtn.innerText = "Collect";
    btns.appendChild(sharebtn);
    btns.appendChild(collectbtn);
    headeritem.appendChild(btns);

    return headeritem;
}

function createNewsTags(ntags)
{
    let newstags = createele('div', 'newstags');
    // loop for newstags
    ntags.forEach((tagname) => {
        let tag = createele('span', 'newstag');
        tag.innerText = tagname;
        newstags.appendChild(tag);
    })
    return newstags;
}

function createHeading(headingtitle)
{
    // add heading of the article
    let heading = createele('div', 'heading');
    heading.innerText = headingtitle;

    return heading;
}

function createNewsInfo(likes, rating, views, time)
{
    let newsinfo = createele('div', 'newsinfo');

    // add like button
    let likebtn = createele('span', 'likebtn');
    likebtn.innerText = likes;
    newsinfo.appendChild(likebtn);
    // add rating
    let ratingele = createele('span', 'rating');
    ratingele.innerText = rating
    newsinfo.appendChild(ratingele);
    // add views
    let viewsele = createele('span', 'views');
    viewsele.innerText = views + " ." 
    newsinfo.appendChild(viewsele);
    // add time
    let timeele = document.createElement('span', 'time');
    timeele.innerText = time;
    newsinfo.appendChild(timeele);

    return newsinfo;

}

function createNewsImg(src_link)
{
    // add image to article
    let newsimg = createele('div', 'newsimg')
    let imgtag = createele('img', 'imgtag');
    // imgtag.src = src_link;
    if (src_link)
    {
        imgtag.src = src_link;
    }
    else 
    {
        imgtag.src = "dalai.jpeg"
    }
    newsimg.appendChild(imgtag);
    return newsimg;
}

function createNewsContent()
{
    // add news description
    let newsdesc = createele('div', 'newsdesc');
    newsdesc.innerText = "Nowadays, talking to conversational agents becoming a daily routine and it is crucial for dialogue systems to generate responses as human-like as possible. As one of the main aspects, primary attention should be providing emotionally aware ...";

    return newsdesc;
}

function createele(type, class_name)
{
    // helper function for creating elements
    let ele = document.createElement(type);
    ele.className = class_name;

    return ele;
}

function smoothScroll(ele) {
    // event.preventDefault();
    // console.log(event.target)
    // const href = event.target.getAttribute("href");
    let href = ele
    console.log("href", href)
    document.getElementById(href).scrollIntoView({
        behavior: "smooth"});
}


//////////////////////////////////////////

rendernews();

let countries = document.querySelectorAll(".countryimg");
console.log(countries);
Array.from(countries).forEach(function(element) {
    console.log("Adding", element.children[0].href.slice(23));
    element.addEventListener('click', () => {
        console.log("Running")
        smoothScroll(element.children[0].href.slice(23));
    });
  });


