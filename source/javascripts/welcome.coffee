$("#enter").mouseover ->
    $(".engine-btn").addClass("engine-btn-hover")
.mouseout ->
    $(".engine-btn").removeClass("engine-btn-hover")
.click ->
    # alert(1)
    $(".engine-btn").addClass("engine-btn-active")
    $(".enter").hide()
    audio = document.getElementById('engine')
    # audio.addEventListener 'timeupdate',
    #   (ev)->
    #           if (audio.currentTime > 1.8) 
    #               audio.pause()
    #   ,false
    audio.play()
    $("#car-light").animate 
            opacity: 0.6
        ,300, ->
            $("#car-light").animate 
                opacity: 0.2
            ,200, ->
                $("#car-light").animate 
                    opacity: 0.8
                ,400, ->
                    $("#car-light").animate 
                        opacity: 0.3
                    ,200, ->
                        animate = $("#car-light").animate 
                            opacity: 0.8
                        ,1000, ->
                            $("#welcome").fadeOut()
                            myAudio = document.getElementById("music")
                            myAudio.addEventListener(
                                'ended',
                                 ->
                                    this.currentTime = 0;
                                    this.play()
                                , false)
                            myAudio.play()