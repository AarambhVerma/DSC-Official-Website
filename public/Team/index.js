console.log("Team Page");

let team = {
  "Board": {
    title: "Board Members",
    leads: [],
    coleads: [],
  },
  "Web": {
    title: "Web Team",
    leads: [],
    mentors: [],
    members: [],
  },
  "Mobile": {
    title: "Mobile Team",
    leads: [],
    mentors: [],
    members: [],
  },
  "ML": {
    title: "ML Team",
    leads: [],
    mentors: [],
    members: [],
  },
  "AR/VR": {
    title: "AR/VR Team",
    leads: [],
    mentors: [],
    members: [],
  },
  "Cyber": {
    title: "Cyber Team",
    leads: [],
    mentors: [],
    members: [],
  },
  "BlockChain": {
    title: "Blockchain Team",
    leads: [],
    mentors: [],
    members: [],
  },
  "Management": {
    title: "Management Team",
    leads: [],
    mentors: [],
    members: [],
  },
  "Marketing": {
    title: "Marketing Team",
    leads: [],
    mentors: [],
    members: [],
  },
  "Designing": {
    title: "Design Team",
    leads: [],
    mentors: [],
    members: [],
  },
};
let data;

window.onload = () => {
  console.log("Team Page Loaded");
  fetchTeamData();
};

function fetchTeamData() {
  console.log("featching team data");
  const url =
    "https://spreadsheets.google.com/feeds/list/158UVlY_oswJSCLbjl2uQu2qEKi9greNvYO5kveXvRiQ/1/public/full?alt=json";
  fetch(url)
    .then((res) => res.json())
    .then((result) => {
      data = result.feed.entry;
      console.log(data);
      setTeamData(data);
      setHtml();
    })
    .catch((err) => {
      console.log(err);
    });
}

function setTeamData(data) {
  data.forEach((e) => {
    if (!team[parseKey(e, "department")]) {
      console.log("dept doesn't exist:", parseKey(e, "department"));
      return;
    }

    console.log(parseKey(e, "department"));
    if (parseKey(e, "designation") === "Lead") {
      team[parseKey(e, "department")].leads.push(e);
    } else if (parseKey(e, "designation") === "Colead") {
      if (team[parseKey(e, "department")].coleads)
        team[parseKey(e, "department")].coleads.push(e);
      else console.log("this dept has not colead position");
    } else if (parseKey(e, "designation") === "Mentor") {
      if (team[parseKey(e, "department")].mentors)
        team[parseKey(e, "department")].mentors.push(e);
    } else {
      if (team[parseKey(e, "department")].members)
        team[parseKey(e, "department")].members.push(e);
    }
  });

  console.log(team);
}

function setHtml() {
  const teamContainer = document.getElementById("teamContainer");
  let data = Object.keys(team);
  console.log(data);
  let temp = " ";
  data.forEach((e) => {
    temp = "<div> ";
    temp += `<h5>${e}</h5> <div class="row mx-0">`;

    temp += `  <div class="col-6"><p>Leads</p><div class="row justify-content-center">`;
    team[e].leads.forEach((l) => {
      temp += `  ${getCardHtml(parseKey(l, "name"), parseKey(l, "imageurl"))} `;
    });
    temp += "</div></div>";

    if (team[e].coleads) {
      temp += `  <div class="col-6"><p>Co-Lead</p><div class="row">`;
      team[e].coleads.forEach((l) => {
        temp += `${getCardHtml(parseKey(l, "name"), parseKey(l, "imageurl"))} `;
      });
      temp += "</div></div>";
    }

    if (team[e].mentors && team[e].mentors.length > 0) {
      temp += `  <div class="col-6"><p>Mentors</p><div class="row">`;
      team[e].mentors.forEach((l) => {
        temp += `${getCardHtml(parseKey(l, "name"), parseKey(l, "imageurl"))} `;
      });
      temp += "</div></div>";
    }

    if (team[e].members && team[e].members.length > 0) {
      temp += `  <div class="col-12"><p>Members</p><div class="row">`;
      team[e].members.forEach((l) => {
        temp += `${getCardHtml(
          parseKey(l, "name"),
          parseKey(l, "imageurl"),
          "col-3"
        )}`;
      });
      temp += "</div></div>";
    }

    temp += "</div> </div>";
    //console.log(temp);
    teamContainer.innerHTML += temp;
  });
}

function parseKey(obj, key) {
  return obj["gsx$" + key].$t;
}

function getCardHtml(name, img_url, classValues = "col-6", ...links) {
  console.log(name, img_url);
  return ` 
  <div class=${classValues}>
  <div class="row teamcard">
    <div class="col-12 text-center">
      <img
        src=${img_url}
        alt="pic"
      />
    </div>
    <div class="col-12 text-center mt-3">${name}</div>
    <div class="col-12 d-flex justify-content-around my-3">
      <div>
        <a
          href="https://github.com/anniemburu"
          target="_blank"
          rel="noopener"
        >
          <i class="fab fa-github"></i>
        </a>
      </div>
      <div>
        <a
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noopener"
        >
          <i class="fab fa-linkedin"></i>
        </a>
      </div>
      <div>
        <a href="" target="_blank" rel="noopener">
          <i class="fas fa-link"></i>
        </a>
      </div>
    </div>
    </div>
    </div>
  `;
}
