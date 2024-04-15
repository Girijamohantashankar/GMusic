/*
  1. Render songs
  2. Scroll top
  3. Play / pause / seek
  4. CD rotate
  5. Next / prve
  6. Random
  7. Next / repeat when ended
  8. Active song
  9. Scroll acctive song into view
  10. Play song when click
*/

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = "MUSIC_PLAYER_TienHieu";

const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");

const app = {
  //Lấy ra chỉ mục đầu tiên của mảng
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
  songs: [
    {
      name: "Har Kasam Se Badi Hai",
      singer: "Bozitt",
      path: "assets/songs/01 - Har Kasam Se Badi Hai - DownloadMing.SE.mp3",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "Chhupana Bhi Nahin Aata",
      singer: "Chhupana Bhi Nahin Aata",
      path: "assets/songs/02 - Chhupana Bhi Nahin Aata - DownloadMing.SE.mp3",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "Agar Zindagi Ho",
      singer: "Agar Zindagi Ho",
      path: "assets/songs/03 - Agar Zindagi Ho - DownloadMing.SE.mp3",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "Teri Umeed Tera Intezar",
      singer: "Teri Umeed Tera Intezar",
      path: "assets/songs/04 - Teri Umeed Tera Intezar - DownloadMing.SE.mp3",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "Dil Ne Yeh Kaha Hain Dil Se",
      // singer: "Agar Zindagi Ho",
      path: "assets/songs/05 - Dil Ne Yeh Kaha Hain Dil Se - DownloadMing.SE.mp3",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "Saaton Janam Main Tere",
      // singer: "Agar Zindagi Ho",
      path: "assets/songs/06 - Saaton Janam Main Tere - DownloadMing.SE.mp3",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "Diwani Diwani",
      // singer: "Agar Zindagi Ho",
      path: "assets/songs/07 - Diwani Diwani - DownloadMing.SE.mp3",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "Pehli Dafaa Is Dil Mein",
      // singer: "Agar Zindagi Ho",
      path: "assets/songs/08 - Pehli Dafaa Is Dil Mein - DownloadMing.SE.mp3",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "Abhi To Mohabbat Ka Aghaz Hai",
      // singer: "Agar Zindagi Ho",
      path: "assets/songs/09 - Abhi To Mohabbat Ka Aghaz Hai - DownloadMing.SE.mp3",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "Pehli Baar Dil Ye",
      // singer: "Agar Zindagi Ho",
      path: "assets/songs/10 - Pehli Baar Dil Ye - DownloadMing.SE.mp3",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "Tune Zindagi Mein Aake - Female",
      // singer: "Agar Zindagi Ho",
      path: "assets/songs/11 - Tune Zindagi Mein Aake - Female - DownloadMing.SE.mp3",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "Mausam Ki Tarah Tum Bhi Badal",
      // singer: "Agar Zindagi Ho",
      path: "assets/songs/12 - Mausam Ki Tarah Tum Bhi Badal - DownloadMing.SE.mp3",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "Kahin Pyaar Na Ho Jaaye",
      // singer: "Agar Zindagi Ho",
      path: "assets/songs/13 - Kahin Pyaar Na Ho Jaaye - DownloadMing.SE.mp3",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "Aanewali Hain Milan Ki",
      // singer: "Agar Zindagi Ho",
      path: "assets/songs/14 - Aanewali Hain Milan Ki - DownloadMing.SE.mp3",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "Aankhon Mein Kya",
      // singer: "",
      path: "assets/songs/15 - Aankhon Mein Kya - DownloadMing.SE.mp3",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "Bahut Pyar Karte Hai",
      // singer: "",
      path: "assets/songs/16 - Bahut Pyar Karte Hai - Female - DownloadMing.SE.mp3",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "Mera Dil Bhi Kitna Pagal Hai",
      // singer: "",
      path: "assets/songs/17 - Mera Dil Bhi Kitna Pagal Hai - DownloadMing.SE.mp3",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "Mere Mehboob Ki Yehi Pehchan",
      // singer: "",
      path: "assets/songs/18 - Mere Mehboob Ki Yehi Pehchan - DownloadMing.SE.mp3",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "Bheegi Huyee Hai Raat",
      // singer: "",
      path: "assets/songs/19 - Bheegi Huyee Hai Raat - DownloadMing.SE.mp3",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "Yaar Badal Na Jaana",
      // singer: "",
      path: "assets/songs/20 - Yaar Badal Na Jaana - DownloadMing.SE.mp3",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "",
      // singer: "",
      path: "assets/songs/",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "",
      // singer: "",
      path: "assets/songs/",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "",
      // singer: "",
      path: "assets/songs/",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "",
      // singer: "",
      path: "assets/songs/",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "",
      // singer: "",
      path: "assets/songs/",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "",
      // singer: "",
      path: "assets/songs/",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "",
      // singer: "",
      path: "assets/songs/",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "",
      // singer: "",
      path: "assets/songs/",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "",
      // singer: "",
      path: "assets/songs/",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "",
      // singer: "",
      path: "assets/songs/",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "",
      // singer: "",
      path: "assets/songs/",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "",
      // singer: "",
      path: "assets/songs/",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "",
      // singer: "",
      path: "assets/songs/",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "",
      // singer: "",
      path: "assets/songs/",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "",
      // singer: "",
      path: "assets/songs/",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "",
      // singer: "",
      path: "assets/songs/",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "",
      // singer: "",
      path: "assets/songs/",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "",
      // singer: "",
      path: "assets/songs/",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "",
      // singer: "",
      path: "assets/songs/",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "",
      // singer: "",
      path: "assets/songs/",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "",
      // singer: "",
      path: "assets/songs/",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "",
      // singer: "",
      path: "assets/songs/",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "",
      // singer: "",
      path: "assets/songs/",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "",
      // singer: "",
      path: "assets/songs/",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "",
      // singer: "",
      path: "assets/songs/",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "",
      // singer: "",
      path: "assets/songs/",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "",
      // singer: "",
      path: "assets/songs/",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "",
      // singer: "",
      path: "assets/songs/",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "",
      // singer: "",
      path: "assets/songs/",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "",
      // singer: "",
      path: "assets/songs/",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "",
      // singer: "",
      path: "assets/songs/",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "",
      // singer: "",
      path: "assets/songs/",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "",
      // singer: "",
      path: "assets/songs/",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "",
      // singer: "",
      path: "assets/songs/",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
    {
      name: "",
      // singer: "",
      path: "assets/songs/",
      image: "https://i.scdn.co/image/ab67616d00001e02f2002dc95c74ac11eaba38d1",
    },
  ],

  setConfig: function (key, value) {
    this.config[key] = value;
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
  },

  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
        <div class="song ${
          index === this.currentIndex ? "active" : ""
        }" data-index="${index}">
            <div class="thumb"
                style="background-image: url('${song.image}')">
            </div>
            <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
            </div>
            <div class="option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
        </div>
    `;
    });
    playlist.innerHTML = htmls.join("");
  },

  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },

  handleEvents: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000,
      itetations: Infinity,
    });
    cdThumbAnimate.pause();
    (document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    }),
      (playBtn.onclick = function () {
        if (_this.isPlaying) {
          audio.pause();
        } else {
          audio.play();
        }
      });
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };
    progress.onchange = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.randomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.randomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
    };
    randomBtn.onclick = function (e) {
      _this.isRandom = !_this.isRandom;
      _this.setConfig("isRandom", _this.isRandom);
      randomBtn.classList.toggle("active", _this.isRandom);
    };
    repeatBtn.onclick = function (e) {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig("isRepeat", _this.isRepeat);
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");

      if (songNode || e.target.closest(".options")) {
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          audio.play();
          _this.render();
        }
        if (e.target.closest(".options")) {
        }
      }
    };
  },

  scrollToActiveSong: function () {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 200);
  },

  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },

  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },

  nextSong: function () {
    this.currentIndex++;

    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },

  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },

  randomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);

    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },

  start: function () {
    this.loadConfig();
    this.defineProperties();
    this.handleEvents();
    this.loadCurrentSong();
    this.render();
    randomBtn.classList.toggle("active", this.isRandom);
    repeatBtn.classList.toggle("active", this.isRepeat);
  },
};

app.start();
