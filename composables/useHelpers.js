export const useCustomHead = (appHost, route) => {
    return useHead({
        base: {
            href: appHost
        },
        link: [
            {
                rel: 'canonical',
                href: appHost + route
            }
        ]
    })
}

export const scrollToSection = sectionId => {
    const headerHeight = document.querySelector('.header').offsetHeight;
    const breadcrumbHeight = document.querySelector('.breadcrumb').offsetHeight;
    const linksBlockHeight = document.querySelector('.product-page__links').offsetHeight;
    const targetElement = document.querySelector(sectionId);
    if (targetElement) {
        const offsetTop = targetElement.offsetTop - headerHeight - breadcrumbHeight - linksBlockHeight - 20;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}
