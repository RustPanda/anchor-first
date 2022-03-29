use anchor_lang::prelude::*;

declare_id!("BoeNUzUVRwqA4xUjL3dmoypZaFSJDMPz5MkWPL1gTZiK");

#[program]
pub mod first {
    use super::*;

    pub fn initialize(_ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
