$(function () {
    /*
    *   Timeout on loader to simulate slow network for presentation purposes
    */
    setTimeout(() => {
        $('.loader-container').fadeOut(1000);
    }, 1000);


    // Hamburger on click animation timeline
    let hamburgerTimeline = gsap.timeline({paused : true});
    let barMargin = parseInt($('#bar2').css('marginTop'));
    let barHeight = $('#bar2').height();
    let hamburgerDuration = .25;

    hamburgerTimeline.to('#bar2', {
        opacity: 0,
        duration: hamburgerDuration,
        ease: 'power1.inOut'
    })
    .to('#bar1', {
        y: barMargin + barHeight,
        duration: hamburgerDuration,
        ease: 'power1.inOut'
    }, '-=' + hamburgerDuration)
    .to('#bar3', {
        y: -(barMargin + barHeight), 
        duration: hamburgerDuration,
        ease: 'power1.inOut'
    }, '-=' + hamburgerDuration)
    .to('#bar1', {
        rotation: 45,
        duration: hamburgerDuration,
        ease: 'power1.inOut' 
    }, '+=' + hamburgerDuration)
    .to('#bar3', {
        rotation: -45,
        duration: hamburgerDuration,
        ease: 'power1.inOut'
    }, '-=' + hamburgerDuration)


    // Hamburger play timeline animation
    let burgerOpen = false;
    $('.hamburger').on('click', ()  => {
        if (burgerOpen) {
            hamburgerTimeline.reverse();
            burgerOpen = false;

            // Hide icons and containers
            $('.nav-link').css('display', 'none');
            $('.navicons').css('display', 'none');
        } else {
            hamburgerTimeline.play();
            burgerOpen = true;

            // Show icons
            $('.nav-link').css('display', 'block');
            $('.navicons').css('display', 'flex');
        }
    });

    // Variable acting as a cookie to see if a user is submitted
    let userSubmitted = false;

    // Register GSAP
    //gsap.registerPlugin();

    let submissionShowTimeline = initializeShowSubmissionTimeline();
    let submissionHideTimeline = initializeHideSubmissionTimeline();

    let submissionPageShowing = false;
    $('#submission').on('click', function () {
        let variableText = $(this).text();

        if (!submissionPageShowing && !userSubmitted) {
            // Show submission page by playing timeline
            submissionShowTimeline.play();
            submissionShowTimeline.restart();
            submissionPageShowing = true;
        } 
    });

    // Hide submission page page
    $('#closeSubmissionPage').on('click', function () {
        // Hide submission page by playing timeline
        submissionHideTimeline.play();
        submissionHideTimeline.restart();
        submissionPageShowing = false;
    });

    // Show submitted buttons for user timeline
    let showSubmissionButtonsTimeline = showButtonForSubmissionUser();



    // Validate submission page  
    $('#submissionButton').on('click', function () {
        
    });

})

/

function showButtonForSubmissionUser() {
    let showButtonsTimeline = gsap.timeline({ paused: true });

    showButtonsTimeline.to('#submission', {
        opacity: 0,
        duration: .5,
        ease: 'power1.inOut',
        onComplete: () => {
            $('#submission i').removeClass('fa-click-in').addClass('fa-click-out');

            // Set display to inline for aboutus page button
            $('#aboutusPage').css({ display: 'inline' });
        }
    })
        .to('#submission', {
            opacity: 1,
            duration: .5,
            ease: 'power1.inOut'
        })
        .to('#aboutusPage', {
            opacity: 1,
            duration: .5,
            ease: 'power1.inOut',
        }, '-=.5');

    return showButtonsTimeline;
}


function initializeShowSubmissionTimeline() {
    // submission page timeline
    let submissionShowTimeline = gsap.timeline({ paused: true });

    // Show submission page page
    submissionShowTimeline.to('#submissionPageContainer', {
        right: 0,
        duration: 1,
        ease: 'power1.inOut'
    })

    return submissionShowTimeline;
}

function initializeHideSubmissionTimeline() {
    // submission page timeline
    let submissionHideTimeline = gsap.timeline({ paused: true });

    // Show submission page page
    submissionHideTimeline.to('#submissionPageContainer', {
        right: '-40%',
        duration: 1,
        ease: 'power1.inOut'
    })

    return submissionHideTimeline;
}
