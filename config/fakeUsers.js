const faker = require("faker/locale/fr");
faker.locale = "fr";
const bcrypt = require("bcrypt");
const axios = require("axios");
const con = require("./db");

const pwd = bcrypt.hashSync("CeciEstUnMotDePasseDeLaMortQuiTue", 10);

async function getPhotos() {
  try {
    let photos = {};
    photos.man = [];
    photos.woman = [];

    const malePromise = axios({
      method: "get",
      url: "https://api.unsplash.com/photos/random/",
      params: {
        client_id:
          "dfe54da331cd72da237e3d6789994e4d86d40949b232843a9fb2ec6a604592cc",
        query: "man",
        w: "300",
        h: "300",
        count: "30"
      }
    });

    const femalePromise = axios({
      method: "get",
      url: "https://api.unsplash.com/photos/random/",
      params: {
        client_id:
          "dfe54da331cd72da237e3d6789994e4d86d40949b232843a9fb2ec6a604592cc",
        query: "woman",
        w: "300",
        h: "300",
        count: "30"
      }
    });

    const [male, female] = await Promise.all([malePromise, femalePromise]);

    male.data.forEach(elem => {
      photos.man.push(elem.urls.custom);
    });

    female.data.forEach(elem => {
      photos.woman.push(elem.urls.custom);
    });
    return photos;
  } catch (e) {
    console.log(e);
  }
}

function getGender(id, photos) {
  if (id === 1) {
    return faker.random.arrayElement(photos.man);
  } else return faker.random.arrayElement(photos.woman);
}

function getTags() {
  let tab = [
    "#poney",
    "#jeuxvideos",
    "#animes",
    "#sports",
    "#cinema",
    "#musique",
    "#argent",
    "#bière",
    "#weed",
    "#42",
    "#dev",
    "#livres",
    "#hashtag",
    "#dormir",
    "#nager",
    "#chalet",
    "#caillou",
    "#patrickbruel",
    "#wtc",
    "#avrillavigne",
    "#justinbieber",
    "#AuDD",
    "#bruh"
  ];
  let chosen = [];
  let tag = "";
  for (let i = 0; i < 6; i++) {
    tag = faker.random.arrayElement(tab);
    chosen.push(tag);
  }
  return chosen.join();
}

async function insertFakeUsers() {
  const photos = await getPhotos();
  let user;
  let sql;
  for (i = 0; i < 50; i++) {
    var first_name = faker.name.firstName();
    var last_name = faker.name.lastName();
    var gender_id = faker.random.number({ min: 1, max: 2 });
    user = {
      user_account: {
        first_name: first_name,
        last_name: last_name,
        email: first_name + "." + last_name + "@gmail.com",
        nickname: first_name + last_name + faker.random.number(99),
        password: pwd,
        age: faker.random.number({ min: 18, max: 40 }),
        details: faker.company.catchPhrase(),
        isEmailVerified: 1,
        gender_id: gender_id,
        orientation_id: faker.random.number({ min: 1, max: 3 }),
        tags: getTags(),
        popularity: faker.random.number({ min: 1, max: 1000 }),
        profil_image: getGender(gender_id, photos),
        geo_id: i + 2
      },
      geo: {
        latitude: faker.finance.amount(48.7, 49, 7),
        longitude: faker.finance.amount(2, 2.7, 7),
        user_account_id: i + 2
      }
    };
    sql = "INSERT INTO user_account SET ?";
    con.query(sql, [user.user_account], (err, res) => {
      if (err) console.log(err);
    });
    sql = "INSERT INTO geolocalisation SET ?";
    con.query(sql, [user.geo], (err, res) => {
      if (err) console.log(err);
    });
  }
  con.end();
}

exports.insertFakeUsers = insertFakeUsers;
