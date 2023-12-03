fn main() {
    let msg = "Hello from Rust";
    println!("{msg} = normalcase");

    let msg = msg.to_uppercase();
    println!("{msg} = uppercase");

    {
        let msg = msg.to_lowercase();
        println!("{msg} = lowercase");
    }

    println!("{msg} = uppercase");
}
