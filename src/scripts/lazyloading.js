// https://dev.to/meshuaibkhalid/lazy-loading-in-vanilla-javascript-improving-website-performance-1856
export function lazyload() {
  const lazyLoadImages = document.querySelectorAll(".lazy");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target;
        // <img> tag
        if (lazyImage.dataset.src !== undefined)
          lazyImage.src = lazyImage.dataset.src;
        // style="background-image" attribute
        if (lazyImage.dataset.bg !== undefined)
          lazyImage.style.backgroundImage = `url('${lazyImage.dataset.bg}')`;
        lazyImage.classList.remove("lazy");
        imageObserver.unobserve(lazyImage);
      }
    });
  });

  lazyLoadImages.forEach((lazyImage) => {
    imageObserver.observe(lazyImage);
  });
}
