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

- Sources
  - [Achieving Multitenancy and Localization in React](https://medium.com/@bernardofoegbu/achieving-multitenancy-and-localization-in-react-6fd1bf694d85)
  - [Multi-Tenant Architecture: How It Works, Pros, and Cons](https://frontegg.com/guides/multi-tenant-architecture)
