
import { slist } from "./listsrc.js";
import { getSongs } from "./listsrc.js";
import { playMusic } from './listsrc.js';
import { getDuration } from './listsrc.js';
import { secondsToMMSS } from './listsrc.js';
import { currentsong } from './listsrc.js';
import { recent } from './listsrc.js';
import { list } from './listsrc.js';
import { ran } from "./listsrc.js";
var storedValue = localStorage.getItem('--val');
let sname = [];
let flag = 0;
let y = [];
let aname = [];
let time = [];
let p = await fetch(`/Playlist/${storedValue}/info.json`)
let response = await p.json()
ran(response.rgba[0], response.rgba[1], response.rgba[2], response.rgba[3])
list(response.img, response.title, response.des)
let f = 0;

async function main() {
    let x = storedValue;

    let songs = await getSongs(x)
    for (let j = 0; j < songs.length; j++) {
        y[j] = songs[j].split(`/${x}/`)[1].replaceAll("%20", " ");
        // console.log(y[j])
        sname[j] = y[j].split("-")[0]
        aname[j] = y[j].split("-")[1]
        aname[j] = aname[j].split(".")[0]
        time[j] = `${secondsToMMSS(await getDuration(songs[j]))}`;

    }
    // const storedArray = JSON.parse(localStorage.getItem('myArray'));
    // const storedName = JSON.parse(localStorage.getItem('playname'));
    // if (storedArray != undefined) {
    //     for (let j = 0; j < storedArray.length; j++) {
    //         document.querySelector(".scroll1").innerHTML = document.querySelector(".scroll1").innerHTML + storedName[j];
    //     }


    // }
    playMusic(y[0], true, x)

    for (let i = 0; i < sname.length; i++) {
        slist(i + 1, sname[i], aname[i], "5", time[i])
    }
    currentsong.addEventListener("timeupdate", () => {
        // console.log(currentsong.currentTime, currentsong.duration);
        let x = currentsong.currentTime;
        let y = currentsong.duration;
        if (!isNaN(currentsong.duration) && isFinite(currentsong.duration)) {
            document.querySelector(".song_time").innerHTML = `${secondsToMMSS(x)}/${secondsToMMSS(y)}`
            document.querySelector(".circle").style.left = (x / y) * 100 + "%";
            document.querySelector(".fill").style.width = (x / y) * 100 + "%";
        }

    }
    )

    Array.from(document.querySelector(".play_songs").getElementsByTagName("tr")).forEach(e => {
        e.addEventListener("click", (a) => {
            flag = 1;
            document.querySelector(".circle").style.left = 0 + "%";
            document.querySelector(".fill").style.width = 0 + "%";
            playMusic(e.getElementsByTagName("th")[1].innerHTML + "-" + e.getElementsByTagName("th")[2].innerHTML + ".mp3", false, x)

            // recent(x, e.getElementsByTagName("th")[1].innerHTML, e.getElementsByTagName("th")[2].innerHTML, localStorage.getItem("im"), f,storedArray,storedName)
            addToHistory(x, e.getElementsByTagName("th")[1].innerHTML, e.getElementsByTagName("th")[2].innerHTML);
            // console.log(currentHistory[1].by)

            document.querySelector(".scroll1").innerHTML = "";
            for (let i = 0; i < currentHistory.length; i++) {
                let html = `<div data-link="${currentHistory[i].page}" class="create br df">
                <span class="no">◑</span>
                <span class="t1">${currentHistory[i].title}
                </span>
                <span class="t2">${currentHistory[i].by}
                </span>
                <button><svg fill="#a7a7a7" height="800px" width="800px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                viewBox="0 0 60 60" xml:space="preserve">
                <g>
                <path d="M45.563,29.174l-22-15c-0.307-0.208-0.703-0.231-1.031-0.058C22.205,14.289,22,14.629,22,15v30
                c0,0.371,0.205,0.711,0.533,0.884C22.679,45.962,22.84,46,23,46c0.197,0,0.394-0.059,0.563-0.174l22-15
                C45.836,30.64,46,30.331,46,30S45.836,29.36,45.563,29.174z M24,43.107V16.893L43.225,30L24,43.107z"/>
                <path d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30
                S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z"/>
                </g>
                </svg></button>
                </div>`
                document.querySelector(".scroll1").innerHTML = document.querySelector(".scroll1").innerHTML + html;

            }
            Array.from(document.getElementsByClassName("create")).forEach(e => {
                e.addEventListener("click", (a) => {
                    let m = a.currentTarget.dataset.link;
                    let t=(e.getElementsByClassName("t1")[0].innerHTML).trim();
                    let by=(e.getElementsByClassName("t2")[0].innerHTML).trim();
                    // console.log(t+"-"+by+".mp3");
                    playMusic(t+" - "+by+".mp3",false,m)
                })
            })
        }

        )

    });
    // Array.from(document.getElementsByClassName("create")).forEach(e => {
    //     e.addEventListener("click", (a) => {
    //         let m = a.currentTarget.dataset.link;
    //         console.log(m);
    //     })
    // })
    // play.addEventListener("click", () => {

    //     console.log("play/pause");
    //     if (currentsong.paused) {
    //         currentsong.play();
    //         play.innerHTML = `<svg width="800px" height="800px" viewBox="0 0 29 24" fill="none" xmlns="http://www.w3.org/2000/svg">

    //     <g id="SVGRepo_bgCarrier"  stroke-width="0"/>
        
    //     <g id="SVGRepo_tracerCarrier" stroke="#a7a7a7" stroke-linecap="round" stroke-linejoin="round"/>
        
    //     <g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="10" stroke="#a7a7a7" stroke-width="0.7"/> <path fill="#a7a7a7" d="M8 9.5C8 9.03406 8 8.80109 8.07612 8.61732C8.17761 8.37229 8.37229 8.17761 8.61732 8.07612C8.80109 8 9.03406 8 9.5 8C9.96594 8 10.1989 8 10.3827 8.07612C10.6277 8.17761 10.8224 8.37229 10.9239 8.61732C11 8.80109 11 9.03406 11 9.5V14.5C11 14.9659 11 15.1989 10.9239 15.3827C10.8224 15.6277 10.6277 15.8224 10.3827 15.9239C10.1989 16 9.96594 16 9.5 16C9.03406 16 8.80109 16 8.61732 15.9239C8.37229 15.8224 8.17761 15.6277 8.07612 15.3827C8 15.1989 8 14.9659 8 14.5V9.5Z" /> <path fill="#a7a7a7" d="M13 9.5C13 9.03406 13 8.80109 13.0761 8.61732C13.1776 8.37229 13.3723 8.17761 13.6173 8.07612C13.8011 8 14.0341 8 14.5 8C14.9659 8 15.1989 8 15.3827 8.07612C15.6277 8.17761 15.8224 8.37229 15.9239 8.61732C16 8.80109 16 9.03406 16 9.5V14.5C16 14.9659 16 15.1989 15.9239 15.3827C15.8224 15.6277 15.6277 15.8224 15.3827 15.9239C15.1989 16 14.9659 16 14.5 16C14.0341 16 13.8011 16 13.6173 15.9239C13.3723 15.8224 13.1776 15.6277 13.0761 15.3827C13 15.1989 13 14.9659 13 14.5V9.5Z"/> </g>
        
    //     </svg>`
    //     }
    //     else {
    //         currentsong.pause();
    //         play.innerHTML = `
    //     <svg fill="#a7a7a7" height="800px" width="800px" version="1.1" id="Capa_1"
    //     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-3 0 80 60"
    //     xml:space="preserve" >
    //     <g >
    //         <path  d="M45.563,29.174l-22-15c-0.307-0.208-0.703-0.231-1.031-0.058C22.205,14.289,22,14.629,22,15v30
    //         c0,0.371,0.205,0.711,0.533,0.884C22.679,45.962,22.84,46,23,46c0.197,0,0.394-0.059,0.563-0.174l22-15
    //         C45.836,30.64,46,30.331,46,30S45.836,29.36,45.563,29.174z M24,43.107V16.893L43.225,30L24,43.107z" />
    //         <path d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30
    //         S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z" />
    //     </g>
    // </svg>`
    //     }
    // }
    // )


    // document.querySelector(".seekbar").addEventListener("click", (e) => {
    //     let perc = (e.offsetX / e.currentTarget.getBoundingClientRect().width) * 100 - 0.1;
    //     document.querySelector(".circle").style.left = (perc + "%");
    //     document.querySelector(".fill").style.width = (perc + "%");
    //     currentsong.currentTime = ((currentsong.duration) * perc) / 100;
    // }
    // )



}
main()
