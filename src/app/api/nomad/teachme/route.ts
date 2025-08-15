import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  // Get topic from query parameters
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get('topic') || '';
  
  if (!topic) {
    return NextResponse.json(
      { error: 'No topic provided' },
      { status: 400 }
    );
  }
  
  // For now, we'll return mock responses
  // In a real implementation, you would use an AI service to generate responses
  
  // Some predefined responses for common topics
  const responses: Record<string, { shortTake: string, deepDive: string }> = {
    'blockchain': {
      shortTake: "A blockchain is a distributed ledger that records transactions across many computers, ensuring data cannot be altered retroactively.",
      deepDive: "Blockchain technology creates a decentralized database (or ledger) of transactions that is secure, transparent, and resistant to outages. Each 'block' contains a timestamp and a link to the previous block, forming a 'chain'.\n\nThe technology eliminates the need for trusted third parties in transactions, as the network itself provides verification. This has profound implications for financial services, supply chains, digital identity, and more.\n\nThe innovation of blockchain is that it allows digital information to be distributed but not copied or tampered with."
    },
    'web3': {
      shortTake: "Web3 represents the next evolution of the internet, focused on decentralization, blockchain technologies, and token-based economics.",
      deepDive: "Web3 is the vision of a more decentralized web, where users have more control over their data and digital assets. It aims to reduce the dominance of large tech companies (Web2) by building on blockchain technology.\n\nKey components include:\n- Decentralized applications (dApps) that run on peer-to-peer networks\n- Smart contracts that automatically execute when conditions are met\n- Token-based economics that align incentives of creators, users, and platforms\n- Self-sovereign identity systems that give users control of their digital identities\n\nWhile still evolving, Web3 represents a shift from centralized platforms to user-owned networks and economies."
    },
    'ai': {
      shortTake: "Artificial Intelligence is the field of creating machines that can perform tasks requiring human-like intelligence, from basic pattern recognition to complex reasoning.",
      deepDive: "AI encompasses various subfields from machine learning to natural language processing and robotics. Modern AI has seen remarkable progress thanks to deep learning algorithms, vast datasets, and increased computing power.\n\nKey AI approaches include:\n- Supervised learning: Training on labeled data to make predictions\n- Unsupervised learning: Finding patterns without labeled data\n- Reinforcement learning: Learning through trial and error with rewards\n- Large language models: Processing and generating human-like text\n\nAI is transforming industries from healthcare to finance, raising important questions about ethics, job displacement, and the future relationship between humans and intelligent machines."
    }
  };
  
  // Normalize the topic for matching
  const normalizedTopic = topic.toLowerCase().trim();
  
  // Look for an exact match first
  if (responses[normalizedTopic]) {
    return NextResponse.json(responses[normalizedTopic]);
  }
  
  // Check for partial matches
  for (const key of Object.keys(responses)) {
    if (normalizedTopic.includes(key) || key.includes(normalizedTopic)) {
      return NextResponse.json(responses[key]);
    }
  }
  
  // Default response for unknown topics
  return NextResponse.json({
    shortTake: `${topic} is a fascinating subject with evolving perspectives across different domains.`,
    deepDive: `I would love to discuss ${topic} in detail! Currently, I have limited information on this specific topic. In a future version, I will connect to an AI to provide detailed insights on ${topic} and many other topics you might be interested in.\n\nFor now, I recommend checking resources like Wikipedia, academic journals, or specialized publications to learn more about ${topic}.`
  });
}
