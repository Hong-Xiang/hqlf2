# Install instruction

1. Download Node.js

    [Node.js Offical site download](https://nodejs.org/en/download/current/)

    Install by adding it to `PATH` environment variable.

2. Add CPNM:

    [Taonpm mirror](https://npm.taobao.org/)

    Quick install:

    ~~~ shell
    npm install -g cnpm --registry=https://registry.npm.taobao.org
    ~~~

3. Install angular-cli

    [Angular CLI](https://cli.angular.io/)

    ~~~ shell
    cnpm install -g @angular/cli
    ~~~

4. Clone project and restore package

    Enter work directory, and

    ~~~ shell
    git clone https://github.com/Hong-Xiang/hqlf2.git
    ~~~

    Enter WEB UI directory:

    ~~~ shell
    cd <Your work directory>/hqlf2/hi
    ~~~

    Install packages

    ~~~ shell
    cnpm install
    ~~~

6. Serve and explorer

    ~~~ shell 
    ng serve -H "0.0.0.0" --port 4201 --disable-host-check
    ~~~

    Open your browser and enter `ip:4201`
