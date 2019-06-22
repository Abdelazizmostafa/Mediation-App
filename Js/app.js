const app =  ()=> {
     const song  =   document.querySelector('.song');
     const play  =   document.querySelector('.play');
     const outline = document.querySelector('.move-outline  circle'); 
     const video =   document.querySelector('.video-container video');

    //Sounds
     const sounds= document.querySelectorAll('.sound-picker button');
    //time Display
     const timeDisplay =  document.querySelector('.time-display');
     const timeSelect = document.querySelectorAll(".time-select button");
    //get the lenght of  outline  circle  
     const outlineLength = outline.getTotalLength();
    //FakeDuration
     let fakeDuration=600;

     //get repaly button
     const repalybtn=document.querySelector('.replay');
     //add evevt to replay Button 
     repalybtn.addEventListener("click", function() {
        restartSong(song);
      });
    
    //Restarting Function 
    const restartSong = song =>{
        let currentTime = song.currentTime;
        song.currentTime = 0;
    
    }

    outline.style.strokeDasharray =outlineLength;
    outline.style.strokeDashoffset = outlineLength;
    
    //play different sounds
    sounds.forEach(sound => {
        sound.addEventListener("click", function() {
          song.src = this.getAttribute("data-sound");
          video.src = this.getAttribute("data-video");
          checkPlaying(song);
        });
      });
    
    
    //play sound 
    play.addEventListener('click' , ()=>{
       checkPlaying(song);
    });
    //select sound 
    timeSelect.forEach(option =>{
       option.addEventListener('click' , function(){
         fakeDuration=this.getAttribute('data-time');
         timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
            fakeDuration % 60
          )}`;
       });
    });

    //create a function to  paly and stop the song 
    const checkPlaying = song => {
        if (song.paused) {
          song.play();
          video.play();
          play.src = "./svg/pause.svg";
        } else {
          song.pause();
          video.pause();
          play.src = "./svg/play.svg";
        }
      };
      
    //we can ainmate the circle 
    song.ontimeupdate= ()=>{
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);
        //Animate the circle 
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;
        //Animate the time
        timeDisplay.textContent = `${minutes}:${seconds}`;
        
        if (currentTime >= fakeDuration) {
          song.pause();
          song.currentTime = 0;
          play.src = "./svg/play.svg";
          video.pause();
        }
    }  



} 


app();
