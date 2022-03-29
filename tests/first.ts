import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { First } from "../target/types/first";

describe("first", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.First as Program<First>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
