export function getBatch(topic) {
    const listofTopics = ["Brexit", "HealthCare", "International Aid", "Corporate Tax", "Abortion", "Prison Reform",
        "Immigration", "Military", "Drugs", "Climate Change"];
    var topicNumber = topic % 10;
    var answer = listofTopics[topicNumber];
    return answer;
};

export function getImage(imgNo) {
    const listofIm = [
        "https://www.nhs.uk/static/nhsuk/img/open-graph.a74435697f45.png",
        "https://www.theparliamentmagazine.eu/siteimg/news-main/ugc-1/fullnews/news/22098/21278_original.jpg",
        "https://bloximages.newyork1.vip.townnews.com/princewilliamtimes.com/content/tncms/assets/v3/editorial/c/f5/cf5aa25e-1c9a-11ea-bbe1-cb91c2d078b0/5df1c706602dd.image.jpg?resize=1793%2C1156",
        "https://smtcenter.net/wp-content/uploads/2018/06/internationalaid.jpg",
        "https://i.insider.com/6017b6f1d6c5e60019c6e2b3?width=1000&format=jpeg&auto=webp",
        "https://c.files.bbci.co.uk/F8AC/production/_106406636_gettyimages-993228102.jpg",
        "https://cdn-japantimes.com/wp-content/uploads/2021/01/np_file_62606-scaled.jpeg",
        "https://d1e00ek4ebabms.cloudfront.net/production/6b7c5fa6-b824-4430-b544-2102ad555fd1.jpg",
        "https://www.pharmaceutical-technology.com/wp-content/uploads/sites/10/2018/09/opioids-3.jpg",
        "https://youmatter.world/app/uploads/sites/2/2018/10/climate-change-definition-meaning.jpg",
    ];
    var image = imgNo % 10;
    var answer = listofIm[image];
    return answer;
}