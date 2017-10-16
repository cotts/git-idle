# Git IDLE

> A CLI to list, download and install dependencies direct from a github repository!

![Example CLI running](img/example.gif)


### Installing

```
$ npm install -g git-idle
```

### How to use

```sh
git-idle --help

  Usage: main <user> [options]

    CLI to download a repository from a github user and install dependencies


    Options:

      -V, --version          Output the version number
      -f, --filter <filter>  Filter for a specific name included
      -n, --notforked        Show only not forked repositorires
      -s, --skip             Skip install dependencies
      -h, --help             Output usage information

```

## Built With

* [Listr](https://github.com/SamVerschueren/listr) - Terminal task list
* [Inquirer.js](https://github.com/SBoudrias/Inquirer.js) - A collection of common interactive command line user interfaces.
* [Request](https://github.com/request/request) - Simplified HTTP request client.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.


## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/cotts/git-idle/tags).

## Author

* **Thadeu Cotts** - *Initial Project*

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


## Acknowledgments

* [**Willian Justen**](https://github.com/willianjusten) - By helping me with a thousand of doubts when I was creating that CLI and how to make my TDD better.

* [**Evandro Ribeiro**](https://github.com/ribeiroevandro) - For some ideas that helped me to create this CLI
