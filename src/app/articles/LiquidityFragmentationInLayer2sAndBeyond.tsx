import Image from "next/image";

export default function LiquidityFragmentationInLayer2sAndBeyond() {
  return (
    <>
      <div>
        <h1 className="text-3xl font-extrabold mb-4 text-[#50fa7b] tracking-wide">
          The Future of{" "}
          <span className="text-[#ff79c6]">Liquidity Fragmentation</span> in
          Layer 2s and Beyond
        </h1>
        <p className="text-base font-medium text-[#6272a4] italic">
          ~ A Developer's Experience Perspective ~
        </p>
        <br />
        <div className="space-y-6">
          <p className="text-sm text-[#f8f8f2] leading-relaxed">
            When I first stepped into the Ethereum ecosystem, it felt like
            opening the door to a library with infinite shelves. Each resource
            promised insight into concepts I barely understood, leaving me
            wondering,
            <span className="italic text-[#50fa7b]">
              {" "}
              ‘Where do I even begin?’
            </span>
          </p>

          <p className="text-sm text-[#f8f8f2] leading-relaxed">
            Over time, I realized that Ethereum’s culture of experimentation and
            decentralization is both intimidating and exciting. Opportunities
            like being selected as a{" "}
            <a
              href="https://nxbn.ethereum.foundation/scholars"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#ff79c6] hover:underline"
            >
              Devcon Scholar
            </a>{" "}
            deepened my understanding of this ecosystem, providing me with a
            global perspective and access to invaluable resources.
          </p>

          <p className="text-base text-[#f8f8f2] leading-relaxed">
            This artifact organizes those insights, exploring the structure and
            mechanisms behind Ethereum’s scalability.
          </p>
        </div>
      </div>
      <br />
      <br />

      <div>
        <h1 className="text-3xl font-bold mb-6 text-center text-[#50fa7b]">
          The Problem: Fragmented Paths
        </h1>

        <div className="flex flex-col items-center mb-6">
          <Image
            src="/tech-tree-fit.png"
            width={800}
            height={800}
            alt="Tech tree"
            className="mb-4 border-2 border-[#ff79c6] rounded shadow-md"
          />
          <p className="text-base font-medium text-[#6272a4] italic self-start">
            ~ The Layer 2s Scaling Tech Tree ~
          </p>
        </div>

        <p className="text-sm text-[#f8f8f2] leading-relaxed">
          Imagine walking into a sprawling marketplace. Each vendor accepts a
          different currency, and there’s no exchange booth in sight. You’re
          forced to zigzag across the market, converting currencies just to
          complete your purchases. This confusion mirrors the challenges of{" "}
          <span className="italic">liquidity fragmentation</span> in Ethereum’s
          Layer 2 ecosystem.
        </p>
      </div>
      <div className="space-y-6">
        <br />
        <h2 className="text-2xl font-bold text-[#50fa7b] mb-4">
          Why Layer 2s Exists
        </h2>
        <p className="text-sm text-[#f8f8f2] leading-relaxed">
          Ethereum’s growth has pushed the limits of its base-layer capacity,
          making faster and more scalable solutions a necessity. Layer 2
          solutions address scalability by processing transactions off-chain and
          reducing congestion on Ethereum’s mainnet. However, this has
          introduced a new challenge:{" "}
          <span className="font-bold text-[#ff79c6]">
            liquidity fragmentation
          </span>
          .
        </p>
        <p className="text-sm text-[#f8f8f2] leading-relaxed">
          <span className="font-bold text-[#50fa7b]">Liquidity</span> refers to
          the availability of assets for transactions. Fragmentation occurs when
          these assets are spread across multiple Layer 2 networks and bridges,
          creating isolated ecosystems.
        </p>
        <p className="text-sm text-[#f8f8f2] leading-relaxed italic">
          Imagine trying to use your savings, but your funds are locked in
          different accounts that don’t communicate seamlessly. This is the
          reality of liquidity fragmentation in the Layer 2 ecosystem.
        </p>
        <br />
        <h2 className="text-2xl font-bold text-[#50fa7b] mb-4">
          Layer 2s as a Cultural Extension
        </h2>
        <p className="text-sm text-[#f8f8f2] leading-relaxed">
          Layer 2 solutions are more than technical upgrades; they reflect
          Ethereum’s culture of experimentation and decentralization. Each Layer
          2 is its own ecosystem with unique features, values, and priorities.
        </p>
        <p className="text-sm text-[#f8f8f2] leading-relaxed">
          However, this pluralistic design also leads to fragmentation. Users
          are drawn to specific Layer 2 networks based on convenience,
          applications, or incentives, further isolating liquidity and
          complicating cross-chain interactions for developers and users alike.
        </p>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-[#50fa7b] mb-4">
            Technical Challenges of Layer 2s
          </h2>

          <p className="text-sm text-[#f8f8f2] leading-relaxed">
            Layer 2s scaling addresses Ethereum’s limitations, but it comes with
            its own set of challenges. Each Layer 2 solution operates as an
            independent ecosystem, leading to fragmented liquidity and
            interoperability barriers.
          </p>

          <ul className="list-disc list-inside space-y-4 text-base text-[#f8f8f2] leading-relaxed">
            <li>
              <span className="font-bold text-[#ff79c6]">
                Liquidity Fragmentation:
              </span>
              &nbsp;Assets are locked in isolated liquidity pools across
              different networks and bridges. For example, a user wanting to
              transfer ETH from one Layer 2s to another might face delays or
              high fees due to uneven liquidity distribution.
            </li>

            <li>
              <span className="font-bold text-[#ff79c6]">
                Data Availability:
              </span>
              &nbsp;Ensuring that transaction data processed off-chain is
              accessible and verifiable remains a complex task for developers
              and users alike.
            </li>

            <li>
              <span className="font-bold text-[#ff79c6]">
                Interoperability:
              </span>
              &nbsp;Transferring assets between Layer 1 and Layer 2—or across
              Layer 2s—requires bridges, which often introduce high fees,
              delays, and potential security risks.
            </li>

            <li>
              <span className="font-bold text-[#ff79c6]">Higher Costs:</span>
              &nbsp;Bridging fees, slippage, and inefficiencies impact both
              users and developers, creating bottlenecks in achieving Ethereum's
              scalability goals.
            </li>
          </ul>

          <p className="text-base text-[#f8f8f2] leading-relaxed">
            These challenges highlight the trade-offs involved in building
            scalable systems while maintaining Ethereum’s core principles of
            decentralization and security.
          </p>
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-[#50fa7b] mb-4">
            Pluralism as Ethereum’s Strength
          </h2>

          <p className="text-sm text-[#f8f8f2] leading-relaxed">
            Despite the complexities, Ethereum’s Layer 2s ecosystem thrives
            because of its flexibility and diversity. Each Layer 2 solution
            brings its own unique features and values, addressing specific user
            needs. Some prioritize advanced cryptographic methods, while others
            focus on governance models, financial inclusion, or user experience.
          </p>

          <p className="text-sm text-[#f8f8f2] leading-relaxed">
            This pluralism enables Ethereum to avoid becoming a monolithic
            system. Instead, it evolves as a network of interconnected yet
            independent systems, fostering innovation across the ecosystem.
            Layer 2s solutions provide a “playground” for developers and
            communities to experiment with ideas while still benefiting from
            Ethereum’s security and shared infrastructure.
          </p>
        </div>
        <br />

        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-[#50fa7b] text-center mb-6">
            Challenges in Layer 2s Ecosystems
          </h1>

          <p className="text-sm text-[#f8f8f2] leading-relaxed">
            Layer 2s solutions like{" "}
            <span className="font-bold text-[#ff79c6]">zkSync</span> and
            <span className="font-bold text-[#ff79c6]"> Optimism</span> have
            transformed Ethereum’s scalability, offering faster and cheaper
            transactions. However, their independent architectures introduce
            challenges, particularly with{" "}
            <span className="italic">interoperability</span> and
            <span className="italic"> liquidity fragmentation</span>.
          </p>

          <p className="text-sm text-[#f8f8f2] leading-relaxed">
            Developers face complex workflows to manage cross-layer
            compatibility, while users encounter higher costs and inefficiencies
            when transferring assets. This section explores real-world
            scenarios, focusing on
            <span className="font-bold text-[#ff79c6]"> zkSync</span> and
            <span className="font-bold text-[#ff79c6]"> Optimism</span>, to
            highlight the technical and operational challenges that shape the
            Layer 2 experience.
          </p>

          <div className="flex flex-col items-center mb-6">
            <Image
              src="/comparison.png"
              width={900}
              height={500}
              alt="zkSync vs Optimism Comparison"
              className="mb-4 border-2 border-[#ff79c6] rounded shadow-md"
            />
            <p className="text-base font-medium text-[#6272a4] italic self-start">
              ~ A Comparative View of zkSync and Optimism Workflows ~
            </p>
          </div>
        </div>
        <br />
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-[#50fa7b] mb-4">
            User Experience
          </h2>

          <p className="text-sm text-[#f8f8f2] leading-relaxed">
            <span className="font-bold text-[#ff79c6]">zkSync</span> offers
            instant transaction finality, ensuring users can trust their
            transfers immediately. Its efficient{" "}
            <span className="italic">zk-proof mechanism</span> also leads to
            long-term cost savings, especially for high-frequency transactions.
            <span className="font-bold text-[#50fa7b]"> Example:</span> A trader
            on a zkSync-based exchange can execute transactions rapidly without
            worrying about delays or fraud challenges.
          </p>

          <p className="text-sm text-[#f8f8f2] leading-relaxed">
            <span className="font-bold text-[#ff79c6]">Optimism</span>, on the
            other hand, has a longer finality period due to the challenge
            period, which can last up to 7 days. While this may not affect
            low-frequency users, it can create friction for those requiring
            immediate confirmations.
            <span className="font-bold text-[#50fa7b]"> Example:</span> A
            governance proposal on an Optimism-based platform might require
            users to wait before funds or decisions are finalized.
          </p>
        </div>
        <br />
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-[#50fa7b] mb-4">
            Developer Ecosystem: Building on Ethereum
          </h2>

          <p className="text-sm text-[#f8f8f2] leading-relaxed">
            <span className="font-bold text-[#ff79c6]">zkSync:</span> Developers
            need to adapt to zkSync-specific tools and SDKs, as it’s still
            moving toward full EVM equivalence. While this presents a learning
            curve, zkSync’s focus on scalability and efficiency attracts
            developers building cutting-edge applications.
            <span className="font-bold text-[#50fa7b]"> Example:</span>{" "}
            Developers creating a high-performance DeFi app may choose zkSync
            for its superior transaction speed and cost efficiency.
          </p>

          <p className="text-sm text-[#f8f8f2] leading-relaxed">
            <span className="font-bold text-[#ff79c6]">Optimism:</span> Fully
            EVM-compatible, Optimism makes it easier for developers to port
            existing Ethereum dApps. This lowers barriers to entry, enabling
            faster adoption and deployment within its ecosystem.
            <span className="font-bold text-[#50fa7b]"> Example:</span> A
            community-driven DAO can migrate to Optimism with minimal changes to
            its smart contracts.
          </p>

          <p className="text-sm text-[#f8f8f2] leading-relaxed">
            While zkSync and Optimism pursue the same ultimate goal—scaling
            Ethereum—they embody Ethereum’s culture of experimentation and
            diversity.
            <span className="font-bold text-[#ff79c6]"> zkSync</span> pushes the
            boundaries of cryptographic scalability, while{" "}
            <span className="font-bold text-[#ff79c6]">Optimism</span> leans
            into developer accessibility and governance innovation. Together,
            they highlight the pluralism of the Ethereum ecosystem, ensuring it
            remains adaptable, secure, and inclusive for a wide range of
            applications and users.
          </p>
        </div>
        <br />

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-[#50fa7b] mb-4">
            Developer Experience: Building the Vibe Check Project
          </h2>

          <p className="text-sm text-[#f8f8f2] leading-relaxed">
            The <span className="font-bold text-[#ff79c6]">Vibe Check</span>{" "}
            project was an experiment to bridge human connection and blockchain
            technology in a pop-up city. It aimed to connect individuals through
            shared moods and experiences. After a session like yoga, attendees
            could log how they felt, with their mood minted as an NFT directly
            into their account—giving them ownership of their emotions, secured
            on Ethereum.
          </p>

          <p className="text-sm text-[#f8f8f2] leading-relaxed">
            This project was a first step toward building a decentralized social
            network, where shared moments and emotions were recorded immutably.
            Each mood NFT represented a piece of a collective story, tying
            participants together through their experiences in a transparent and
            trustless way.
          </p>

          <p className="text-sm text-[#f8f8f2] leading-relaxed">
            For me, as a developer, this project was more than coding. It was an
            opportunity to explore how Ethereum’s decentralized infrastructure
            could enhance real-world interactions and lay the foundation for a
            social network where ownership and connection merge seamlessly.
          </p>

          <div className="flex flex-col items-center mb-6">
            <Image
              src="/vibe.png"
              width={500}
              height={500}
              alt="Vibe Check Project"
              className="mb-4 border-2 border-[#ff79c6] rounded shadow-md"
            />
            <p className="text-base font-medium text-[#6272a4] italic text-left">
              ~ The Vibe Check Project Interface ~
            </p>
          </div>
        </div>
        <br />
        <p className="text-sm text-[#f8f8f2] leading-relaxed">
          Building the Vibe Check project involved integrating Ethereum’s
          decentralized infrastructure with modern AI tools to create mood NFTs.
          The process combined data collection, sentiment analysis, and
          AI-driven prompt generation to mint unique, personalized NFTs.
        </p>

        <div className="text-base text-[#f8f8f2] leading-relaxed">
          <span className="font-bold text-[#ff79c6]">Key Steps:</span>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <span className="font-bold">Data Collection:</span> Participants
              logged moods after activities like yoga, which were classified as
              positive, neutral, or negative using sentiment analysis.
            </li>
            <li>
              <span className="font-bold">AI-Generated Prompts:</span> AI
              created text prompts based on moods (e.g., "A radiant sunrise for
              positivity") to generate visual NFT artwork.
            </li>
            <li>
              <span className="font-bold">NFT Minting:</span> Artwork and
              metadata were minted as ERC-721 NFTs on zkSync for scalability and
              cost efficiency.
            </li>
          </ul>
        </div>

        <p className="text-sm text-[#f8f8f2] leading-relaxed">
          <span className="font-bold text-[#ff79c6]">Developer Learnings </span>
          Combining AI and blockchain highlighted several challenges, including
          zkSync compatibility, wallet integration, debugging across multiple
          systems, and deployment complexities. Deploying smart contracts on
          zkSync required adapting to its evolving infrastructure and overcoming
          compatibility issues with front-end tools. Wallet integration was
          equally demanding, as Layer 2-specific configurations added friction
          to the development process. Despite these hurdles, the project
          demonstrated blockchain’s potential for creative and personalized
          experiences, offering valuable insights into the future of
          decentralized application development.
        </p>

        <br />
        <h1 className="text-3xl font-bold text-[#50fa7b] text-center mb-6">
          A Seamless Future: Liquidity and Interoperability Redefined
        </h1>

        <div className="flex flex-col items-center mb-6">
          <Image
            src="/future-bgg.png"
            width={900}
            height={300}
            alt="Vibe Check Project"
            className="mb-4 border-2 border-[#ff79c6] rounded shadow-md"
          />
          <p className="text-base font-medium text-[#6272a4] italic text-left">
            ~ Common Future ~
          </p>
        </div>

        <div className="space-y-6">
          <p className="text-sm text-[#f8f8f2] leading-relaxed">
            As Ethereum evolves, the challenges of{" "}
            <span className="italic">liquidity fragmentation</span>
            and <span className="italic"> interoperability</span> remain
            barriers to its full potential. Yet, these challenges are also
            opportunities to innovate and collaborate. The goal is not just to
            solve these issues but to create a future where{" "}
            <span className="font-bold">
              using Ethereum’s ecosystem feels as seamless as using the
              internet.
            </span>
          </p>

          <p className="text-sm text-[#f8f8f2] leading-relaxed">
            In this future, whether a transaction happens on{" "}
            <span className="font-bold text-[#ff79c6]">Ethereum mainnet</span>,
            a <span className="font-bold text-[#ff79c6]">Layer 2</span>, or a
            sidechain will no longer matter. What will matter is that users can
            effortlessly swap tokens, participate in governance, and engage with
            decentralized applications without worrying about the underlying
            complexities. For developers, this means focusing on{" "}
            <span className="italic">building impactful experiences</span>,
            rather than managing fragmented systems. Ethereum becomes not a
            fragmented collection of chains, but a{" "}
            <span className="font-bold text-[#ff79c6]">
              single, interconnected ecosystem
            </span>
            , where collaboration replaces division.
          </p>

          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-[#ff79c6] mb-4">
              ERC-7683: Pioneering a Connected Ecosystem
            </h2>
            <p className="text-sm text-[#f8f8f2] leading-relaxed">
              One of the most promising innovations for solving interoperability
              challenges is{" "}
              <span className="font-bold text-[#ff79c6]">ERC-7683</span>, a
              standard designed to unify crosschain interactions. By enabling
              users to declare <span className="italic">intents</span>— actions
              like token swaps, DeFi deposits, and governance votes—ERC-7683
              simplifies and standardizes communication between Ethereum
              mainnet, Layer 2s, and sidechains.
            </p>

            <p className="text-sm text-[#f8f8f2] leading-relaxed">
              The standard eliminates fragmentation by providing a universal
              framework for crosschain operations, making it easier for
              developers to build interoperable applications and for users to
              experience frictionless interactions across the ecosystem.
            </p>

            <ul className="list-disc ml-6 space-y-2 text-base text-[#f8f8f2] leading-relaxed">
              <li>
                <span className="font-bold">Unifying Ethereum:</span> Harmonizes
                diverse Layer 2s and sidechains into a seamless, interoperable
                ecosystem.
              </li>
              <li>
                <span className="font-bold">Boosting Liquidity:</span> Allows
                dApps to access shared liquidity pools, reducing fragmentation
                and improving efficiency.
              </li>
              <li>
                <span className="font-bold">
                  Enhancing Developer Experience:
                </span>{" "}
                Abstracts crosschain complexities, enabling developers to focus
                on creating user-centric applications.
              </li>
              <li>
                <span className="font-bold">Simplifying User Experience:</span>{" "}
                Ensures intuitive and frictionless crosschain interactions.
              </li>
            </ul>

            <p className="text-sm text-[#f8f8f2] leading-relaxed">
              ERC-7683 has already garnered significant attention across the
              Ethereum ecosystem, with adoption by various protocols and
              projects aiming to simplify and standardize crosschain
              interactions. By reducing transaction failure rates, accelerating
              crosschain operations, and fostering deeper liquidity, ERC-7683
              showcases the potential to transform Ethereum into a truly
              interconnected network.
            </p>
          </div>

          <p className="text-sm text-[#f8f8f2] leading-relaxed">
            While Layer 2 has addressed scalability challenges, the evolution
            toward Layer 3 and application-specific rollups offers exciting
            opportunities to create tailored solutions for diverse use cases. In
            this next phase, decentralized governance will play a vital role in
            managing shared liquidity and aligning ecosystem-wide decisions with
            the needs of both users and developers.
          </p>

          <p className="text-sm text-[#f8f8f2] leading-relaxed">
            The future of Ethereum is not just about scalability but about
            building a seamless, collaborative ecosystem where liquidity flows
            effortlessly, users interact frictionlessly, and developers are
            empowered to innovate without barriers. With innovations like
            ERC-7683, the vision of a unified, borderless blockchain ecosystem
            is within reach.
          </p>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#ff79c6] mb-4">
              The Beginning of My Journey in Decentralized Innovation
            </h2>
            <p className="text-sm text-[#f8f8f2] leading-relaxed">
              For me, this artifact represents more than just research—it marks
              the beginning of my contribution to this space. As I explored
              liquidity fragmentation, interoperability, and crosschain
              standards, I realized just how much potential Ethereum holds in
              reshaping the way we connect and build.
            </p>
            <p className="text-sm text-[#f8f8f2] leading-relaxed">
              This is my first step, but it won’t be my last. Whether through
              writing, building, or speaking, I am committed to continuing this
              journey—researching, learning, and contributing to Ethereum’s
              evolution. Each step forward strengthens the vision of a
              decentralized future, one where technology empowers human
              connection and creativity.
            </p>
            <p className="text-sm leading-relaxed italic text-[#6272a4]">
              The vision of a unified, borderless blockchain ecosystem is one I
              deeply believe in, and I’m excited to play my part in making it a
              reality. The future isn’t just something to witness—it’s something
              we build together. 🌟
            </p>
          </div>
        </div>

        <div className="border border-[#ff79c6] rounded-lg p-6 bg-[#1e1f29] shadow-lg mt-12">
          <h2 className="text-2xl font-bold text-[#50fa7b] mb-4 text-center">
            References
          </h2>
          <ul className="list-decimal list-inside text-base text-[#f8f8f2] leading-relaxed space-y-2">
            <li>
              <a
                href="https://erc7683.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ff79c6] hover:underline"
              >
                ERC-7683: Standard for Crosschain Intents
              </a>
            </li>
            <li>
              <a
                href="https://devcon.org/en/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ff79c6] hover:underline"
              >
                Devcon: Ethereum's Developer Conference
              </a>
            </li>
            <li>
              <a
                href="https://zkSync.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ff79c6] hover:underline"
              >
                zkSync: Scaling Ethereum with zk-Rollups
              </a>
            </li>
            <li>
              <a
                href="https://optimism.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ff79c6] hover:underline"
              >
                Optimism: Scaling Ethereum Through Optimistic Rollups
              </a>
            </li>
            <li>
              <a
                href="https://eips.ethereum.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ff79c6] hover:underline"
              >
                Ethereum Improvement Proposals (EIPs)
              </a>
            </li>
            <li>
              <a
                href="https://vitalik.eth.limo/general/2024/05/29/l2culture.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ff79c6] hover:underline"
              >
                Layer 2s as cultural extensions of Ethereum
              </a>
            </li>
            <li>
              <a
                href="https://vitalik.eth.limo/general/2023/10/31/l2types.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ff79c6] hover:underline"
              >
                Different types of layer 2s
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
