---
title: AV1 Decoder
slug: av1-work-plan
background: dce0e9
image: /images/av1.png
---

Instead of starting from scratch, we are going to transpile the C code from the [dav1d](https://code.videolan.org/videolan/dav1d) project to Rust, then work on improving the resulting Rust code to the point that it performs as well or better than dav1d.

# Work Plan

1. Initial translation
  * Transpile C sources
  * Patch assembly code support back in for x86-64
  * Make sure that we pass built-in tests and can run the CLI decoder on the Netflix OpenContent AV1 encoded files 
  * Configure initial CI setup to test Rust port
2. Patch in ARM and i686 support
  * Add support for the following targets
    * linux-x86 (32-bit)
    * linux-arm (32-bit)
    * linux-aarch64
  * Adjust CI to cover as many Intel and ARM targets as possible are functional
3. Set up continuous correctness checking
  * Conceptually, the decoder loops over each frame which in turn loops over each superblock, which loops over each block. Reconstruction of individual blocks happens in several stages (in the function decode_b). We will therefore instrument the transpiled Rust code to cross-check the decoding of each block against the C implementation. This lets us check the correctness of the initial translation and let us incrementally check each subsequent change in isolation.
4. Migrate block decoding
  * We will do bottom-up migration starting with the functions called from decode_b and work our way through each of the outer loops function by function. 
    * Structures will be kept layout-compatible with C for as long as needed. As soon as it is possible, we will change types to be safe and idiomatic. Some types will likely remain unsafe until Steps 5 and 6.
    * We will then remove or minimize the amount of unsafe blocks. The block decoding will likely not be fully safe at this stage since the surrounding code (e.g. superblock decoding, frame decoding) operate on C-style, unsafe data structures at this stage. Steps 5 and 6 will allow more code to be made safe.
    * Migrate individual decoding stages including:
      * Motion field estimation
      * Motion vector prediction
      * Intra and inter-frame prediction of sample values
      * Decoding quantization and other transform parameters
      * Reconstruction and dequantization
      * Inverse transforms (all variants of DCT, ADST, WHT, and identity)
5. Migrate frame and superblock decoding
  * Continue bottom-up migration by handling superblocks, and entire frames including state management for blocks, frames, and tiles. The ideal sequencing of the migration steps is hard to predict and will instead be determined on the fly.
    * Migrate all 10 superblock partitioning modes and 5 block levels.
    * Migrate initialization of motion vectors and frame buffers
    * Migrate frame-end CDF update process
    * Reference frame updating.
  * Remove unsafe blocks and unsafe data types that could not be made safe in step 4.
6. Migrate code before and after frame decoding
  * Migrate parsing of sequence headers, including the 8 kinds of open block units.
    * Replace any demuxing code with mp4parse-rust
  * Migrate arithmetic decoding
  * Migrate post-processing filters
    * deblocking
    * constraint directional enhancement
    * upscaling
    * loop restoration
  * film grain synthesis.
7. Address threading
  * How to best create and manage threads is an open question. Options include using a library to manage a thread pool (such as rayon [used by rav1e] or the threadpool crate), or using Rust’s std threading with libraries such as crossbeam to provide nontrivial cross-thread communication patterns if needed. Determine the most suitable threading approach.
  * Implement the selected threading approach.
8. Cleanup
  * Make sure migration-related TODOs are all addressed.
    * Make sure that comments are preserved and formatted correctly.
