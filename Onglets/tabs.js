(function () {

    var afficherOnglet = function (a, animations) {

        if (animations === undefined) {
            animations = true
        }

        var li = a.parentNode
        var div = a.parentNode.parentNode.parentNode
        var activeTab = div.querySelector('.tab_content.active')
        var aAfficher = div.querySelector(a.getAttribute('href'))

        if (li.classList.contains('active')) {
            return false
        }

        div.querySelector('.tabs .active').classList.remove('active')
        li.classList.add('active')

        if (animations) {

            activeTab.classList.add('fade')
            activeTab.classList.remove('in')
            activeTab.addEventListener('transitionend', function () {
                this.classList.remove('fade')
                this.classList.remove('active')
                aAfficher.classList.add('active')
                aAfficher.classList.add('fade')
                aAfficher.offsetWidth
                aAfficher.classList.add('in')
            }, { once: true })

        } else {
            aAfficher.classList.add('active')
            activeTab.classList.remove('active')
        }
    }
    var tabs = document.querySelectorAll('.tabs a')

    for (var i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener('click', function (e) {
            afficherOnglet(this)
        })
    }

    var hashChange = function () {
        var hash = window.location.hash
        var a = document.querySelector('a[href="' + hash + '"]')
        if (a !== null && !a.parentNode.classList.contains('active')) {
            afficherOnglet(a, false)
        }
    }

    window.addEventListener('hashchange', hashChange)
    hashChange()

})()