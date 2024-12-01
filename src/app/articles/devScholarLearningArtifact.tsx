import Image from "next/image";

export default function DevScholars() {
  return (
    <>
      <div>
        <h1 className="text-4xl font-bold mb-4">Dev Scholars Journey</h1>
        <p>
          When I first stepped into the Ethereum ecosystem, it felt like opening
          the door to a library with infinite shelves. Each resource promised
          insight into concepts I barely understood, leaving me wondering,
          <br />
          ‘Where do I even begin?’{" "}
        </p>
        <p>
          Over time, I realized that Ethereum’s culture of experimentation and
          decentralization is both intimidating and exciting. Through events
          like Devcon, conversations, and online communities, I began piecing it
          all together.
          <br />
          This artifact organizes those insights, exploring the structure and
          mechanisms behind Ethereum’s scalability.
        </p>
      </div>
      <br />
      <br />

      <div>
        <h1>The problem</h1>
        <Image
          src="/tech-tree-fit.png"
          layout="responsive"
          width={100}
          height={100}
          alt="Tech tree"
          className="mb-4 border-2 border-[#ff79c6] w-full h-full"
        />
      </div>

      <div>
        <p>Why layer 2 exists</p>
        <br />
        <p>
          Ethereum’s growth has pushed the limits of its base-layer capacity,
          making faster and more scalable solutions a necessity. Layer 2
          solutions address scalability by processing transactions off-chain and
          reducing congestion on Ethereum’s mainnet. However, this has
          introduced a new challenge: liquidity fragmentation.
          <br />
          Liquidity refers to the availability of assets for transactions.
          Fragmentation occurs when these assets are spread across multiple
          Layer 2 networks and bridges, creating isolated ecosystems.
          <br />
          Imagine trying to use your savings, but your funds are locked in
          different accounts that don’t communicate seamlessly. This is the
          reality of liquidity fragmentation in the Layer 2 ecosystem.
        </p>
        <br />
        <p>Layer 2 as a Cultural Extension</p>
        <br />
        <p>
          Layer 2 solutions are more than technical upgrades; they reflect
          Ethereum’s culture of experimentation and decentralization. Each Layer
          2 is its own ecosystem with unique features, values, and priorities.
          However, this pluralistic design also leads to fragmentation. Users
          are drawn to specific Layer 2 networks based on convenience,
          applications, or incentives, further isolating liquidity and
          complicating cross-chain interactions for developers and users alike.
        </p>
        <p>Technical Challenges of Layer 2</p>
        <br />
        <p>
          Layer 2 scaling addresses Ethereum’s limitations, but it comes with
          its own set of challenges. Each Layer 2 solution operates as an
          independent ecosystem, leading to fragmented liquidity and
          interoperability barriers.
          <br />
          • Liquidity Fragmentation: Assets are spread across multiple Layer 2
          networks, making it difficult for users to move funds efficiently and
          for developers to build seamless cross-layer applications. --- •
          Liquidity Fragmentation: Assets are locked in isolated liquidity pools
          across different networks and bridges. For example, a user wanting to
          transfer ETH from one Layer 2 to another might face delays or high
          fees because liquidity isn’t evenly distributed.
          <br />
          • Data Availability: Ensuring that transaction data processed
          off-chain is accessible and verifiable remains a complex task. ---- •
          Interoperability: Moving assets between layers often requires bridges,
          which are costly and complex. Developers building dApps must navigate
          these fragmented systems, increasing workflows and maintenance
          efforts.
          <br />• Interoperability: Transferring assets between Layer 1 and
          Layer 2—or across Layer 2s—requires bridges, which often introduce
          high fees and delays. These challenges highlight the trade-offs
          involved in building scalable systems while maintaining Ethereum’s
          core principles of decentralization and security. ---- • Higher Costs:
          Bridging fees and slippage result in inefficiencies, impacting both
          users and developers. These technical challenges limit Ethereum’s
          potential to scale efficiently while maintaining a seamless user
          experience.
        </p>
        While Layer 2 solutions solve scalability, they introduce several
        challenges:
        <br />
        <p>Pluralism as Ethereum’s Strength</p>
        <p>
          Despite the complexities, Ethereum’s Layer 2 ecosystem thrives because
          of its flexibility and diversity. Each Layer 2 solution brings its own
          unique features and values, addressing specific user needs. Some
          prioritize advanced cryptographic methods, while others focus on
          governance models, financial inclusion, or user experience.
          <br />
          This pluralism enables Ethereum to avoid becoming a monolithic system.
          Instead, it evolves as a network of interconnected yet independent
          systems, fostering innovation across the ecosystem. Layer 2 solutions
          provide a “playground” for developers and communities to experiment
          with ideas while still benefiting from Ethereum’s security and shared
          infrastructure.
        </p>
        <br />
        <p>
          The diversity of Layer 2 solutions demonstrates how Ethereum’s culture
          drives technical and social innovation. In the next section, we’ll
          explore specific examples of Layer 2 solutions and their unique
          approaches to scalability. These examples will illustrate how Layer 2s
          tackle common challenges while expanding Ethereum’s capabilities.
          {/* ----
          The challenges of liquidity fragmentation aren’t just
          theoretical—they’re real barriers to Ethereum’s scalability vision.
          With dozens of bridges and Layer 2 networks operating independently,
          assets are scattered across ecosystems. For example, a bridge may only
          have liquidity for 2,000 ETH, making large transfers impossible
          without high slippage or fees. In the next section, we’ll explore how
          these challenges manifest in specific Layer 2 solutions and what this
          means for developers and users alike */}
        </p>
        <br />
        <h1>Challenges in Layer 2 Ecosystems</h1>
        <br />
        <p>
          Layer 2 solutions like zkSync and Optimism have transformed Ethereum’s
          scalability, offering faster and cheaper transactions. However, their
          independent architectures introduce challenges, particularly with
          interoperability and liquidity fragmentation.
          <br />
          Developers face complex workflows to manage cross-layer compatibility,
          while users encounter higher costs and inefficiencies when
          transferring assets. This section explores real-world scenarios,
          focusing on zkSync and Optimism, to highlight the technical and
          operational challenges that shape the Layer 2 experience
        </p>
        <br />
        <Image
          src="/comparison.png"
          layout="responsive"
          width={100}
          height={100}
          alt="Tech tree"
          className="mb-4 border-2 border-[#ff79c6] w-full h-full"
        />
        <br />
        <p>User Experience</p>
        <br />
        <p>
          zkSync offers instant transaction finality, ensuring users can trust
          their transfers immediately. Its efficient zk-proof mechanism also
          leads to long-term cost savings, especially for high-frequency
          transactions. Example: A trader on a zkSync-based exchange can execute
          transactions rapidly without worrying about delays or fraud
          challenges.
        </p>
        <br />
        <p>
          Optimism, on the other hand, finality takes longer due to the
          challenge period, which can last up to 7 days. While this may not
          affect low-frequency users, it can create friction for those requiring
          immediate confirmations. Example: A governance proposal on an
          Optimism-based platform might require users to wait before funds or
          decisions are finalized.
        </p>
        {/* <p>pjesa tjeter</p> */}
        <br />
        <p>Developer Ecosystem: Building on Ethereum</p>
        <br />
        <p>
          {" "}
          zkSync: Developers need to adapt to zkSync-specific tools and SDKs, as
          it’s still moving toward full EVM equivalence. While this presents a
          learning curve, zkSync’s focus on scalability and efficiency attracts
          developers building cutting-edge applications. Example: Developers
          creating a high-performance DeFi app may choose zkSync for its
          superior transaction speed and cost efficiency.
        </p>
        <br />
        <p>
          {" "}
          • Optimism: Fully EVM-compatible, Optimism makes it easier for
          developers to port existing Ethereum dApps. This lowers barriers to
          entry, enabling faster adoption and deployment within its ecosystem.
          Example: A community-driven DAO can migrate to Optimism with minimal
          changes to its smart contracts
        </p>
        <br />
        <p>
          While zkSync and Optimism pursue the same ultimate goal—scaling
          Ethereum—they embody Ethereum’s culture of experimentation and
          diversity. zkSync pushes the boundaries of cryptographic scalability,
          while Optimism leans into developer accessibility and governance
          innovation. Together, they highlight the pluralism of the Ethereum
          ecosystem, ensuring it remains adaptable, secure, and inclusive for a
          wide range of applications and users.
        </p>
        <br />
        <p>Developer Experience: Building the Vibe Check Project</p>
        <br />
        <p>Developer Experience: Building the Vibe Check Project</p>
        <br />
        <p>
          {" "}
          The Vibe Check project was an experiment to bridge human connection
          and blockchain technology in a pop-up city. It aimed to connect
          individuals through shared moods and experiences. After a session like
          yoga, attendees could log how they felt, with their mood minted as an
          NFT directly into their account—giving them ownership of their
          emotions, secured on Ethereum.
        </p>
        <p>
          This project was a first step toward building a decentralized social
          network, where shared moments and emotions were recorded immutably.
          Each mood NFT represented a piece of a collective story, tying
          participants together through their experiences in a transparent and
          trustless way.
        </p>
        <p>
          For me, as a developer, this project was more than coding. It was an
          opportunity to explore how Ethereum’s decentralized infrastructure
          could enhance real-world interactions and lay the foundation for a
          social network where ownership and connection merge seamlessly.
        </p>
        <Image
          src="/vibe.png"
          layout="responsive"
          width={100}
          height={100}
          alt="Tech tree"
          className="mb-4 border-2 border-[#ff79c6] w-full h-full"
        />
      </div>
    </>
  );
}
