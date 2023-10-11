# Classless SVG

Classless SVG is a SVG compressor and optimiser hosted on Vercel, tailored to accelerate the workflow of web designers and developers. Uses [SVGO 3](https://github.com/svg/svgo) defaults for initial compression, it introduces an additional optimization step to overcome a common hiccup encountered when working with Adobe Illustrator.

Creating SVGs in Illustrator often results in the generation of classes like `.cls-1`, which can be cumbersome when managing multiple SVGs in web design projects. It alleviates this by stripping out these classes and replacing them with presentation attributes, ensuring a neat SVG structure.

## Features
- Rapid SVG compression and optimization leveraging SVGO 3 defaults.
- Specialized optimization to eliminate `.cls-1` classes and substitute them with presentation attributes, perfect for SVGs exported from Adobe Illustrator.
- Ideal for handling multiple SVGs in web design projects, ensuring a streamlined, clutter-free SVG structure.

## Usage

Visit [ClasslessSVG](https://classless-svg.vercel.app) and paste your SVG source code into the provided field. Hit the 'Optimise' button and voila, your optimised SVG is ready for use!

## To-Do
- Implement a feature to convert SVG presentation attributes to Tailwind CSS classes for further optimisation and integration with Tailwind CSS projects.

## Contributing

We welcome your contributions! Feel free to open an issue or create a pull request on the GitHub repository to report problems or suggest improvements.

## License

MIT

---

Experience a cleaner, more efficient SVG handling for your web design projects with SVG Minimalist. Your journey towards clutter-free SVGs just got easier and faster!
