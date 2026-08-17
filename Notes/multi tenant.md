<!--toc:start-->

- [What Is Multi-Tenant Architecture?](#what-is-multi-tenant-architecture)
- [Why Is Multi-Tenant Architecture Important?](#why-is-multi-tenant-architecture-important)
- [How Is a Multi-Tenant Architecture Different from a Single-Tenant Architecture?](#how-is-a-multi-tenant-architecture-different-from-a-single-tenant-architecture)
- [How Does Multi-Tenancy Work? 3 Types of Multi-tenant Architecture](#how-does-multi-tenancy-work-3-types-of-multi-tenant-architecture)
  - [Single Application, Single Database](#single-application-single-database)
  - [Single Application, Multiple Database](#single-application-multiple-database)
  - [Multiple Application, Multiple Database](#multiple-application-multiple-database)
- [Multi-Tenant Architecture: Pros and Cons](#multi-tenant-architecture-pros-and-cons)
- [Multi-Tenant Architecture Examples: 3 Options for Multi-Tenant SaaS Deployment](#multi-tenant-architecture-examples-3-options-for-multi-tenant-saas-deployment)
  - [URL-Based SaaS](#url-based-saas)
  - [Multi-Tenant SaaS](#multi-tenant-saas)
  - [Virtualization-Based SaaS](#virtualization-based-saas)
- [Multi-Tenant Authentication](#multi-tenant-authentication)
- [How to Improve Multi-Tenancy Security](#how-to-improve-multi-tenancy-security)
  - [**Multi-Tenant Authentication**](#multi-tenant-authentication)
- [Multi-Tenant User Management With Frontegg](#multi-tenant-user-management-with-frontegg)
  - [See Our Additional Guides on Key IaaS Topics](#see-our-additional-guides-on-key-iaas-topics)
- [See Additional Guides on Key IaaS Topics](#see-additional-guides-on-key-iaas-topics)
- [[Load Balancer](https://www.radware.com/cyberpedia/application-delivery/what-is-load-balancing/)](#load-balancerhttpswwwradwarecomcyberpediaapplication-deliverywhat-is-load-balancing)
- [[AWS Cost Optimization](https://www.finout.io/blog/aws-cost-optimization-6-free-tools-10-hacks-to-cut-aws-bills)](#aws-cost-optimizationhttpswwwfinoutioblogaws-cost-optimization-6-free-tools-10-hacks-to-cut-aws-bills)
- [[Digital Asset Management](https://cloudinary.com/guides/digital-asset-management/digital-asset-management)](#digital-asset-managementhttpscloudinarycomguidesdigital-asset-managementdigital-asset-management)
<!--toc:end-->

Jul 07, 2022 | 11  min read |

## What Is Multi-Tenant Architecture?

Multi-tenant architecture is the use of a single logical software application or service to serve multiple customers. In this model, each customer is referred to as a tenant. You can provide a tenant with the ability to customize certain parts of the application, like business rules, users, displays, and database schemas. However, a tenant typically cannot customize the application code.

With multi-tenant architecture, several application instances operate in a shared environment. Each instance can serve one or more tenants. This works by running tenants on the same physical infrastructure, while keeping them logically isolated. All tenants share some aspects of the application—such as the business logic and central configuration—while having their own separate data, customizations, and user management, isolated from all other tenants.

This is part of an extensive series of guides about [IaaS](https://www.atlantic.net/dedicated-server-hosting/what-is-iaas/).

## Why Is Multi-Tenant Architecture Important?

Multi-tenant architecture is a foundational technology behind cloud computing. Cloud providers use multi-tenancy to manage multiple customers on the same infrastructure, and this is the basis for the economic benefits and elasticity of the public cloud. Private clouds can also make use of multi-tenancy, to share the same resources between multiple users, projects, or organizational units.

![](https://frontegg.com/wp-content/webp-express/webp-images/uploads/2024/05/Screenshot-2024-05-21-at-15.27.59.png.webp)

**_Multi-Tenant Architecture_**

The cost effectiveness made possible by multi-tenancy is possibly the biggest driver encouraging enterprises to adopt multi-tenant architectures.

Another important driver is scalability. A single platform that serves multiple public cloud customers or multiple units within an organization makes it possible to operate at a very large scale. This means that cloud users have access to virtually unlimited resources at the click of a button. If multi-tenancy was inefficient or cumbersome, cloud computing would not be possible.

## How Is a Multi-Tenant Architecture Different from a Single-Tenant Architecture?

When designing a SaaS application, providers must choose their tenancy model: single or multi-tenant. The tenancy model has major implications for, including the resources needed to serve the application, scalability, and operational complexity.

A single-tenant architecture provides a single instance of the software or infrastructure to one customer. This instance includes all customer data and is physically isolated from other customers. Customer data and operations are never shared with other application instances.

In this model, the provider manages the software instance on dedicated infrastructure, typically with its own database, while providing the user a high level of flexibility over software and hardware customizations.

A single-tenancy model typically provides more control and improved security for the user. However, it also increases complexity for users, because they need to configure their instance and have more limited scalability options. This model is also likely to be much more expensive for the user, while software functionality remains the same.

A multi-tenant architecture uses a single instance of the software application to serve multiple customers. All tenants share common features like security, business logic, and resource management. At the same time, each tenant is isolated from the others to protect its private data and settings. Customer data is kept confidential by permissions mechanisms that ensure each customer can only see their own data.

In this model, providers save costs, and users receive important benefits such as scalability, automated setup and ease of use. At the same time, multi-tenancy naturally creates greater security risks, as well as other concerns such as performance and reliability. The client cannot always predict in advance how their tenant will perform and whether they will be impacted by resource constraints of the provider or the activities of other tenants.

The differences between the two architectures can be summarized as follows:

<table><tbody><tr><td><strong>Aspect</strong></td><td><strong>Single Tenant Architecture</strong></td><td><strong>Multi Tenant Architecture</strong></td></tr><tr><td><strong>Data Isolation</strong></td><td>Complete isolation; each tenant has a separate database.</td><td>Data is isolated at the application or database layer using schemas or tenant IDs.</td></tr><tr><td><strong>Customization</strong></td><td>High customization options; tenants can modify the infrastructure and software.</td><td>Limited customization; mainly through configurable settings within the application.</td></tr><tr><td><strong>Scalability</strong></td><td>Scalability is limited as each new tenant requires a new instance.</td><td>High scalability; new tenants can be added without significant resource overhead.</td></tr><tr><td><strong>Security</strong></td><td>Higher security due to physical isolation.</td><td>Potential security risks due to shared resources.</td></tr><tr><td><strong>Cost</strong></td><td>Higher costs due to dedicated resources for each tenant.</td><td>Lower costs due to shared infrastructure and resources.</td></tr><tr><td><strong>Maintenance</strong></td><td>Maintenance must be performed separately for each tenant.</td><td>Central maintenance, updates apply across all tenants.</td></tr><tr><td><strong>Performance</strong></td><td>Consistent performance, unaffected by other tenants.</td><td>Performance can vary, potentially affected by other tenants’ activities (“noisy neighbors”).</td></tr><tr><td><strong>Resource Utilization</strong></td><td>Lower resource utilization efficiency.</td><td>Higher efficiency in resource utilization due to shared environment.</td></tr></tbody></table>

Learn More: [Multi-tenant SaaS](https://frontegg.com/guides/building-a-multi-tenant-enterprise-saas-application-on-aws)

## How Does Multi-Tenancy Work? 3 Types of Multi-tenant Architecture

### Single Application, Single Database

In this configuration, all tenants share a single application instance along with a single database. Each tenant’s data is differentiated and isolated within the same database using schemas or tenant-specific identifiers.

This model simplifies the maintenance and deployment of the application as there is only one database to manage. However, it may lead to challenges in scaling and data security since all data coexists in the same physical database, increasing the risk of data breaches or leakage of data between tenants.

### Single Application, Multiple Database

The single application, multiple database model involves one application instance connected to multiple databases. Each tenant has its own database, ensuring data isolation at the storage level.

This model enhances data security and reduces the risk of “noisy neighbor” issues, as each tenant’s data operations are confined to their own database. However, managing multiple databases can increase the complexity of the infrastructure and may require more resources for maintenance and management.

### Multiple Application, Multiple Database

In the multiple application, multiple database model, each tenant has their own dedicated application instance as well as a separate database. This setup provides the highest level of isolation and security among the multi-tenant architectures. It allows for extensive customization and optimization of the application per tenant, but at the cost of higher resource consumption and operational complexity. This model is typically used in scenarios where tenants require high levels of control over their environment.

## Multi-Tenant Architecture: Pros and Cons

Here are key advantages of multi-tenant architecture for SaaS:

- **Lower costs**— Multi-tenancy enables the serving of multiple tenants using a single instance, helping support the infrastructure. Since tenants share responsibilities over software maintenance, data center operations, and infrastructure, the ongoing costs are lower. For example, providers can offer SaaS software deployed on multi-tenant infrastructure for a predictable annual or monthly subscription price.
- **Scalability and improved productivity for tenants**— A multi-tenant architecture enables tenants to scale on demand. New users can access the same software instance, typically incurring an incremental subscription rate increase. Tenants do not need to manage software or infrastructure, freeing up their time for other important tasks.
- **Customization without coding**— Most vendors offering multi-tenant solutions provide a high level of customization to ensure each tenant customer can customize the application according to specific business needs. This is much easier than custom development, minimizing risks and reducing work time and costs.
- **Continuous, consistent updates and maintenance** — Multi-tenant software providers are responsible for patches and updates. They apply new features and fixes without any effort required on the customer’s part. Unlike a single-tenant architecture that requires providers to update every software instance, multi-tenancy involves one update.

Here are notable drawbacks of multi-tenant architecture for SaaS:

- **Greater security risk**—a single-tenant architecture isolates security events to a single customer. Multi-tenant architecture, however, does not allow complete isolation because multiple tenants share resources. As a result, the risk factor increases, and a security event impacting one tenant may harm other customers. Any information hosted on shared databases, for example, may expose all data if one customer is compromised.
- **Noisy neighbors** – Since multi-tenancy enables tenants to share resources, they also share the load. If one customer suddenly increases the load, this impacts other tenants sharing the same resource.

## Multi-Tenant Architecture Examples: 3 Options for Multi-Tenant SaaS Deployment

A common use case for multi-tenancy is to deploy applications on shared infrastructure and deliver them to multiple tenants as a SaaS application. Each organization or user accesses the application over the internet, and pays a monthly subscription fee. Here are three options for delivering a multi-tenant SaaS application to its users.

### URL-Based SaaS

URL-based SaaS models utilize distinct URLs to direct users to tenant-specific instances of an application. This approach allows for straightforward tenant identification and simplifies routing logic. It’s particularly effective in enhancing user experience by providing each tenant a unique application URL, which can be branded or customized as needed. URL-based SaaS models are common in environments where branding and direct access are important for the tenant experience.

### Multi-Tenant SaaS

Multi-tenant SaaS is characterized by a single application instance serving multiple tenants, where tenants share the application and infrastructure resources. In this model, tenants are logically isolated but physically integrated within the same application environment.

This setup is cost-effective and simplifies updates and maintenance as changes need to be made only once to affect all tenants. It is suitable for applications where extensive customization is not required and where operational efficiency is prioritized.

**Read [SaaS Multitenancy: Components, Pros and Cons and 5 Best Practices](https://frontegg.com/blog/saas-multitenancy)**

### Virtualization-Based SaaS

Virtualization-based SaaS uses virtualization technology to separate tenants onto different virtual machines or containers within the same physical server. This approach allows each tenant to operate as if they have their own dedicated server, providing a high degree of isolation and security.

It also enables better resource utilization and flexibility in resource allocation. Virtualization-based SaaS is ideal for providers needing to balance isolation with cost-efficiency, especially in resource-intensive applications.

## Multi-Tenant Authentication

One of the main challenges when building multi-tenant applications is managing user identities. Multi-tenant applications require managing users in the context of their tenants, in such a way that each user belongs to a tenant:

- Each user has credentials provided by their own organization/tenant.
- Users should be able to access their own data, but not other tenants’ data.
- Organizations can register applications and assign specific application roles to their members.

The [authentication](https://frontegg.com/blog/authentication) process is as follows:

- Users log in to the application using their existing organizational credentials. Commonly, this is done with [single sign on (SSO)](https://frontegg.com/guides/single-sign-on-sso) so that users do not need to create a new user profile for the multi-tenant application.
- All users from the same organization belong to the same tenant.
- When a user logs in, the application identifies the relevant tenant and provides access to it.

The authorization process is as follows:

- When the application authorizes a user’s request (e.g., to view a resource), it must consider the user’s tenant.
- Users can have assigned roles in the application (e.g., standard user or administrator). The customer organization, not the application provider, should manage these role assignments.

Learn more: [Multi-Tenant Authentication](https://frontegg.com/guides/how-to-persist-jwt-tokens-for-your-saas-application)

## How to Improve Multi-Tenancy Security

Use the following best practices to ensure a multi-tenant architecture is secure:

- **Effective Governance and Compliance Processes** – Before you implement multi-tenancy, establish a privacy, security, and compliance policy that protects your tenant’s corporate and intellectual property (in a public cloud) or properly isolates tenants according to their sensitivity (in a private cloud).
- **Enable Process Auditing –** Ensure that independent parties can audit the compliance of IT systems, especially those hosting applications and tenant data. Ensure everything complies with government regulations, industry standards, and individual company policies.
- **Verify Cloud Provider Access Controls** – Cloud providers must have robust systems for controlling employee access to resources that store, transmit, and run customer applications and data, and must be able to demonstrate to tenants that their process is effective.
- **Ensure Effective Separation –** A cloud provider must enforce virtual infrastructure encryption policies and access controls to partition cloud deployments from each other and effectively isolate tenant data.
- **Monitor Data Sharing** – Discover and monitor permission settings applied to shared files, including those shared to users outside your organization via web links. Employees might share sensitive files via cloud-based email, file sharing, and cloud storage platforms like Google Drive and Dropbox.
- **Implement Data Loss Prevention (DLP)** – DLP can ensure that data stored in a tenant is not lost or stolen by attackers. It can also prevent downloads of sensitive data to personal devices, as well as intentional or unintentional data sharing and exposure.

Here are notable drawbacks of multi-tenant architecture for SaaS:

- **Greater security risk**—a single-tenant architecture isolates security events to a single customer. Multi-tenant architecture, however, does not allow this isolation because multiple tenants share resources. As a result, the risk factor increases, and a security event impacting one tenant may harm other customers. Any information hosted on shared databases, for example, may expose all data if one customer is compromised.
- **Noisy neighbors** – Since multi-tenancy enables tenants to share resources, they also share the load. If one customer suddenly increases the load, this impacts other tenants sharing the same resource.

### **Multi-Tenant Authentication**

One of the main challenges when building multi-tenant applications is managing user identities. Multi-tenant applications require managing users in the context of their tenants, in such a way that each user belongs to a tenant:

- Each user has credentials provided by their own organization/tenant.
- Users should be able to access their own data, but not other tenants’ data.
- Organizations can register applications and assign specific application roles to their members.

The authentication process is as follows:

- Users log in to the application using their existing organizational credentials. Commonly, this is done with SSO so that users do not need to create a new user profile for the multi-tenant application.
- All users from the same organization belong to the same tenant.
- When a user logs in, the application identifies the relevant tenant and provides access to it.

The authorization process is as follows:

- When the application authorizes a user’s request (e.g., to view a resource), it must consider the user’s tenant.
- Users can have assigned roles in the application (e.g., standard user or administrator). The customer organization, not the SaaS provider, should manage these role assignments.

**Learn more:** [**Multi-Tenant Authentication**](https://frontegg.com/guides/how-to-persist-jwt-tokens-for-your-saas-application)

## Multi-Tenant User Management With Frontegg

In a nutshell, Frontegg’s PLG-centric and end-to-end [user management](https://frontegg.com/guides/user-management) platform is multi-tenant by design.

By developing the platform to the essential requirements of the B2B SaaS, we know that each tenant has its own configurations, user sets, and security settings. This is why Frontegg allows each environment to hold segregated sets of tenants, assign users to each one of them, and hold a separate configuration for each one of them in a way that doesn’t affect the neighboring tenants in any way or form.

In the complex B2B world, each customer requires fine grained control on each configuration. That requires professional products to keep pace with these requirements and develop a multi-tenant capable infrastructure from day one. Frontegg just makes it easier.

### See Our Additional Guides on Key IaaS Topics

## See Additional Guides on Key IaaS Topics

Together with our content partners, we have authored in-depth guides on several other topics that can also be useful as you explore the world of [IaaS](https://www.atlantic.net/dedicated-server-hosting/what-is-iaas/).

## [Load Balancer](https://www.radware.com/cyberpedia/application-delivery/what-is-load-balancing/)

_Authored by Radware_

- [What is a Load Balancer? History, Key Functions, Pros and Cons](https://www.radware.com/cyberpedia/application-delivery/what-is-load-balancing/)
- [What Is Global Server Load Balancing (GSLB) & Top 3 Benefits](https://www.radware.com/cyberpedia/application-delivery/what-is-global-server-load-balancing-gslb/)

## [AWS Cost Optimization](https://www.finout.io/blog/aws-cost-optimization-6-free-tools-10-hacks-to-cut-aws-bills)

_Authored by Finout_

- [Top 5 Free & Open Source AWS Cost Optimization Tools](https://www.finout.io/blog/free-and-open-source-aws-cost-monitoring-tools)
- [Top 10 AWS Cost Optimization Best Practices & Why You Need Them](https://www.finout.io/blog/aws-cost-optimization-best-practices)
- [What Are AWS Spot Instances, Pros/Cons, and 6 Ways to Save Even More](https://www.finout.io/blog/aws-spot-instances)

## [Digital Asset Management](https://cloudinary.com/guides/digital-asset-management/digital-asset-management)

_Authored by Cloudinary_

- [Digital Asset Management: Benefits & Best Practices (2025)](https://cloudinary.com/guides/digital-asset-management/digital-asset-management)
- [What is Metadata?](https://cloudinary.com/guides/digital-asset-management/what-is-metadata)
- [A Unified Approach to Digital Asset Management, Across the Asset Lifecycle](https://cloudinary.com/blog/a_unified_approach_to_digital_asset_management_across_the_asset_lifecycle)

<https://www.dotcms.com/blog/empowering-multi-brand-strategies-maintaining-brand-consistency-across-multiple-sites>

---

## Headless CMS Options with Multi-Tenancy Support

Research of headless CMS platforms that support multi-tenancy and work with Next.js, React, .NET, and other frontend frameworks.

### 1. Payload CMS

- **Multi-tenancy**: Official `@payloadcms/plugin-multi-tenant` plugin (community alternatives too). Adds tenant field to collections, filters admin panel data by tenant, auto-assigns tenant on create.
- **Architecture**: Installs directly into your Next.js app — CMS and frontend share codebase, TypeScript types, DB connection, and deployment. No separate API service.
- **License**: MIT, self-hosted. Data lives in your own Postgres instance.
- **Frontends**: Next.js (first-class), any REST/GraphQL client including .NET.
- **Best for**: Next.js projects, data ownership, TypeScript-native development.
- **Caveats**: Tenant scoping requires deliberate implementation at every query level. Plugin ecosystem is smaller than Strapi.
- **GitHub**: 40k+ stars, 105k weekly npm downloads (as of 2026).
- **Pricing**: Free self-hosted (unlimited). Payload Cloud available.

### 2. Webiny

- **Multi-tenancy**: Built-in Tenant Manager. Create tenants programmatically via GraphQL API. Content inheritance and propagation across tenants. Tenant hierarchies (brands, regions, customers).
- **Architecture**: Serverless (AWS). TypeScript framework. GraphQL API + SDK.
- **License**: Open-source.
- **Frontends**: Next.js Starter Kit included. Any GraphQL client.
- **Best for**: Serverless SaaS platforms, multi-brand ecosystems, enterprise.
- **Caveats**: Tied to AWS serverless stack. Learning curve for plugin system.
- **Pricing**: Self-hosted (free, unlimited). Enterprise with advanced tenant management.

### 3. Strapi

- **Multi-tenancy**: NOT supported out of the box. Recommended approach: separate Strapi instances per client. Community plugins exist (e.g., `strapi-plugin-multitenancy` with PostgreSQL schema-per-tenant isolation, or `strapi-plugin-multi-tenant` for organization/user-group based isolation).
- **Architecture**: Separate Node.js process, separate deployment, separate schema from your frontend.
- **License**: MIT, self-hosted.
- **Frontends**: Any (REST + GraphQL). Works with Next.js, React, .NET.
- **Best for**: Single-tenant-per-instance setups. Projects needing many third-party integrations.
- **Caveats**: True multi-tenancy requires complex custom work. Strapi Cloud helps manage multiple instances.
- **Pricing**: Free self-hosted. Strapi Cloud paid plans.

### 4. Directus

- **Multi-tenancy**: Role-based access control + relational fields. Create a Tenants collection, add relationships to data collections, set permission rules to filter by tenant. Also supports multi-instance via Directus Hub (proposed orchestration layer).
- **Architecture**: Headless CMS + backend. REST + GraphQL APIs. Self-hosted or Cloud.
- **License**: Open-source (BSL).
- **Frontends**: Any (REST, GraphQL, SDKs). Works with .NET, React, Next.js.
- **Best for**: Custom multi-tenant setups via RBAC. SQL flexibility. Teams wanting full data control.
- **Caveats**: Multi-tenancy is manually configured (not a plugin). No native tenant isolation at DB level.
- **Pricing**: Free self-hosted. Directus Cloud paid plans.

### 5. dotCMS

- **Multi-tenancy**: TRUE multi-tenancy built-in. Massively multisite (1000+ sites). Each site has own branding, users, permissions, content — while sharing/reusing content across sites.
- **Architecture**: Java-based. REST + GraphQL. Hybrid headless (traditional + headless).
- **License**: Enterprise (community edition available).
- **Frontends**: Any (REST, GraphQL). Next.js, React, .NET, etc.
- **Best for**: Enterprise, large-scale multi-brand, omnichannel.
- **Caveats**: Java stack (heavier). Enterprise-focused pricing.
- **Pricing**: Community Edition (free). Enterprise (paid).

### 6. Storyblok

- **Multi-tenancy**: Via "spaces" concept — each space is an independent content repository with its own components, assets, environments, collaborators, and permissions.
- **Architecture**: SaaS. Visual editor. REST + GraphQL APIs.
- **License**: Proprietary (SaaS).
- **Frontends**: Any (REST, GraphQL). SDKs for React, Next.js, Vue, Nuxt, .NET.
- **Best for**: Enterprise, multi-brand content management, marketing teams.
- **Caveats**: Fully SaaS (no self-hosted option). Pricing tiers limit spaces.
- **Pricing**: Free tier available. Paid plans start at ~$50/mo.

### 7. Hygraph (formerly GraphCMS)

- **Multi-tenancy**: Multiple projects/instances for tenant isolation. Can share schemas across instances.
- **Architecture**: GraphQL-native. SaaS.
- **Frontends**: Any GraphQL client. React, Next.js, Vue, .NET.
- **Best for**: GraphQL-first teams, multi-brand enterprises.
- **Caveats**: SaaS-only. Not self-hostable.
- **Pricing**: Free tier. Paid plans based on content volume.

### 8. Contentful

- **Multi-tenancy**: Multi-tenant SaaS platform. Multi-space architecture for isolation — spaces can be divided by business unit, region, or channel. Cross-space referencing for shared content.
- **Architecture**: SaaS. REST + GraphQL. Microservices-based infrastructure.
- **License**: Proprietary.
- **Frontends**: Any (REST, GraphQL, SDKs). First-class support for React, Next.js, .NET, iOS, Android.
- **Best for**: Enterprise, vendor-managed, content-heavy editorial workflows.
- **Caveats**: Expensive at scale. Vendor lock-in. SaaS-only.
- **Pricing**: Free tier. Enterprise pricing (custom).

### 9. Sigil CMS

- **Multi-tenancy**: NATIVE multi-tenancy with PostgreSQL Row-Level Security (database-layer isolation). Unlimited tenants from one deployment. Tenant switcher, subdomain routing, site cloning.
- **Architecture**: Node.js + PostgreSQL. TypeScript SDK. GraphQL + REST. Next.js App Router integration.
- **License**: Open-source (self-hosted free, unlimited).
- **Frontends**: Next.js (first-class via `@sigil-cms/next`), any REST/GraphQL client.
- **Best for**: Agencies managing multiple clients. Cost-sensitive multi-tenant. AI-era features.
- **Caveats**: Very new project (2026). Smaller community. Requires PostgreSQL.
- **Pricing**: Free self-hosted (unlimited). Cloud plans from $12/mo (Solo) to $249/mo (Enterprise).

### 10. Caisy

- **Multi-tenancy**: Projects, groups, and organizations hierarchy. Quick switching between projects. Duplicate entire projects.
- **Architecture**: SaaS. GraphQL API. Visual editor with live preview.
- **Best for**: Agencies managing multiple client projects.
- **Caveats**: SaaS-only. Relatively new.
- **Pricing**: Proprietary.

### 11. TinaCMS

- **Multi-tenancy**: Domain-based middleware rewrites in Next.js. Single Next.js + Tina instance serves multiple domains. Content segmented by tenant in folders.
- **Architecture**: Git-based (content in MDX/MD files). Next.js-only.
- **Frontends**: Next.js only (tightly coupled).
- **Best for**: Next.js, git-centric workflows, teams wanting version-controlled content.
- **Caveats**: Next.js only. Git-based (not ideal for non-developer content editors).
- **Pricing**: Free self-hosted. TinaCloud paid plans.

### 12. SkyCMS

- **Multi-tenancy**: Built-in from the ground up. Single deployment serves multiple independent websites. Domain-based tenant resolution via middleware. Multi-database support (FlexDb — auto-selects between Cosmos DB, SQL Server, MySQL, SQLite).
- **Architecture**: .NET (ASP.NET Core). Entity Framework Core. MediatR. REST API.
- **Frontends**: Any (REST API). Built for .NET ecosystem.
- **Best for**: .NET shops, ASP.NET Core ecosystems, enterprises on Microsoft stack.
- **Caveats**: .NET-only ecosystem. Less known.
- **Pricing**: Open-source.

### 13. Odin CMS

- **Multi-tenancy**: Organizations, properties, and RBAC with granular permissions.
- **Architecture**: NestJS (backend) + Next.js (dashboard). MongoDB + Redis + Elasticsearch. AI-enhanced.
- **Best for**: Editorial teams, publishers, AI-powered content workflows.
- **Pricing**: Open-source (CE).

---

### Comparison Summary

| CMS | Multi-Tenancy Approach | Self-Host | Frontend Compatibility | Best For |
|-----|----------------------|-----------|----------------------|----------|
| **Payload CMS** | Plugin (tenant field per collection) | ✅ Free | Next.js (native), any REST/GraphQL | Next.js, TypeScript, data ownership |
| **Webiny** | Built-in Tenant Manager | ✅ Free | Next.js kit, any GraphQL | Serverless SaaS, multi-brand |
| **Strapi** | ❌ Not native (separate instances) | ✅ Free | Any (REST + GraphQL) | Single-tenant per instance |
| **Directus** | RBAC + relational fields | ✅ Free | Any (REST + GraphQL + SDKs) | Custom RBAC, SQL flexibility |
| **dotCMS** | ✅ True multi-tenant (1000+ sites) | ✅ Community | Any (REST + GraphQL) | Enterprise, multi-brand |
| **Storyblok** | Spaces (content repositories) | ❌ SaaS only | Any (SDKs for all) | Enterprise, marketing teams |
| **Hygraph** | Multiple projects | ❌ SaaS only | Any (GraphQL) | GraphQL-first teams |
| **Contentful** | Multi-space architecture | ❌ SaaS only | Any (SDKs for all) | Enterprise, editorial workflows |
| **Sigil CMS** | ✅ Native RLS (PostgreSQL) | ✅ Free | Next.js kit, any REST/GraphQL | Agencies, cost-sensitive |
| **Caisy** | Projects/groups/orgs | ❌ SaaS only | Any (GraphQL) | Agencies, multi-client |
| **TinaCMS** | Domain-based middleware | ✅ Free | Next.js only | Git-centric, Next.js |
| **SkyCMS** | ✅ Built-in, domain-based | ✅ Free | Any (REST), .NET ecosystem | .NET/ASP.NET Core teams |
| **Odin CMS** | Organizations + RBAC | ✅ Free | Next.js dashboard | Editorial, AI workflows |

### Frontend Compatibility Matrix

| CMS | Next.js | React | .NET | Vue/Angular/Svelte | Mobile |
|-----|---------|-------|------|-------------------|--------|
| Payload CMS | ⭐ Native | ✅ | ✅ REST/GraphQL | ✅ | ✅ |
| Webiny | ✅ Starter Kit | ✅ | ✅ GraphQL | ✅ | ✅ |
| Strapi | ✅ | ✅ | ✅ | ✅ | ✅ |
| Directus | ✅ SDK | ✅ SDK | ✅ SDK | ✅ SDK | ✅ SDK |
| dotCMS | ✅ | ✅ | ✅ | ✅ | ✅ |
| Storyblok | ✅ SDK | ✅ SDK | ✅ SDK | ✅ SDK | ✅ SDK |
| Hygraph | ✅ | ✅ | ✅ GraphQL | ✅ | ✅ |
| Contentful | ✅ SDK | ✅ SDK | ✅ SDK | ✅ SDK | ✅ |
| Sigil CMS | ⭐ `@sigil-cms/next` | ✅ | ✅ REST/GraphQL | ✅ | ✅ |
| Caisy | ✅ | ✅ | ✅ GraphQL | ✅ | ✅ |
| TinaCMS | ⭐ Tightly coupled | ❌ | ❌ | ❌ | ❌ |
| SkyCMS | ✅ REST | ✅ REST | ⭐ Native (.NET) | ✅ | ✅ |

---

### Open-Source & Free-License Options (Filtered)

CMS options with true open-source licenses (MIT, Apache, etc.) or free self-hosting with no feature gating:

| CMS | License | Self-Host | Multi-Tenancy | Cost at Scale | Notes |
|-----|---------|-----------|---------------|---------------|-------|
| **Payload CMS** | MIT | ✅ Unlimited | Plugin-based | Free forever | TypeScript-native, Next.js tight integration |
| **Webiny** | MIT/Apache 2.0 | ✅ Unlimited | Built-in Tenant Manager | Free forever | Serverless AWS, GraphQL |
| **Strapi** | MIT | ✅ Unlimited | ❌ Not native (per-instance) | Free (but need N instances for N tenants) | Best ecosystem for plugins |
| **Directus** | BSL (source-available) | ✅ Unlimited | RBAC + relational fields | Free forever | Custom-built, very flexible |
| **Sigil CMS** | MIT | ✅ Unlimited | Native (PostgreSQL RLS) | Free forever | Newest option, most native multi-tenant |
| **TinaCMS** | Apache 2.0 | ✅ Unlimited | Domain middleware | Free forever | Next.js only, git-based |
| **SkyCMS** | MIT | ✅ Unlimited | Built-in domain-based | Free forever | .NET/ASP.NET Core stack |
| **Odin CMS** | MIT | ✅ Unlimited | Organizations + RBAC | Free forever | NestJS/Next.js, AI features |
| **dotCMS** | Community (free) | ✅ Community | True multi-tenant (1000+ sites) | Free (CE has limits) | Java-based, enterprise features |

#### Truly Free Self-Hosted with Native Multi-Tenancy (Best Picks)

These are the projects that are **both** free to self-host **and** have native/built-in multi-tenancy (not bolted on):

1. **SkyCMS** — Built-in domain-based multi-tenancy, .NET ecosystem
2. **Sigil CMS** — Native PostgreSQL RLS isolation, TypeScript/Next.js
3. **dotCMS (CE)** — Built-in multisite (1000+ sites), Java-based
4. **Webiny** — Built-in Tenant Manager, serverless framework

These need manual multi-tenancy setup but are free and flexible:
5. **Payload CMS** — Plugin-based (requires deliberate implementation)
6. **Directus** — RBAC-based (manual configuration)
7. **Odin CMS** — Organizations/RBAC

- Sources
  - [Achieving Multitenancy and Localization in React](https://medium.com/@bernardofoegbu/achieving-multitenancy-and-localization-in-react-6fd1bf694d85)
  - [Multi-Tenant Architecture: How It Works, Pros, and Cons](https://frontegg.com/guides/multi-tenant-architecture)
