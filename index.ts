const main = async () => {
    const dayNumber = process.argv[2]
    const module = await import(`./day${dayNumber}`)

    if (module.Task1 !== undefined) {
        console.log(module.Task1())
    }

    if (module.Task2 !== undefined) {
        console.log(module.Task2())
    }
}

main()