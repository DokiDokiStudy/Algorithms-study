class Node {
    constructor(depth, value) {
        this.depth = depth
        this.value = value
        this.count = 1
        this.children = []
    }
}

class Trie {
    constructor() {
        this.root = new Node(0, null)
    }

    insert(info) {
        let cur = this.root
        for (let i = 0; i < info.length; i++) {
            let index = cur.children.findIndex((el) => el.value === info[i])
            if (index !== -1) {
                cur.children[index].count += 1
            } else {
                cur.children.push(new Node(cur.depth + 1, info[i]))
                index = cur.children.length - 1
            }
            cur = cur.children[index]
        }
    }

    search(query) {
        let count = 0
        const list = [this.root]
        while (list.length !== 0) {
            const cur = list.shift()
            if (cur.count === 0) {
                continue
            }
            if (cur.depth < query.length - 1) {
                if (query[cur.depth] === '-') {
                    list.unshift(...cur.children)
                } else {
                    const child = cur.children.find(el => el.value === query[cur.depth])
                    if (child) {
                        list.unshift(child)
                    }
                }
            } else {
                for (let i = 0; i < cur.children.length; i++) {
                    if (cur.children[i].value * 1 >= query[4] * 1) {
                        count += cur.children[i].count
                    }
                }
            }
        }
        return count
    }
}

function solution(info, query) {
    const trie = new Trie()
    info.map((cur) => {
        trie.insert(cur.split(" "))
    })

    return query.reduce((acc, cur) => {
        acc.push(trie.search(querySplit(cur)))
        return acc
    }, [])
}

function querySplit (query) {
    return query.split(" ").filter((item)=> item !== "and");
}